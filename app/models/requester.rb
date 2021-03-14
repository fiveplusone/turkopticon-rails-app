# == Schema Information
#
# Table name: requesters
#
#  id                           :integer          not null, primary key
#  all_approved_or_pending      :integer
#  all_pending_or_didnt_do_hits :integer
#  all_rejected                 :integer
#  amzn_requester_name          :string(255)
#  av_comm                      :decimal(3, 2)
#  av_fair                      :decimal(3, 2)
#  av_fast                      :decimal(3, 2)
#  av_pay                       :decimal(3, 2)
#  av_pay_bucket                :string(255)
#  ava                          :decimal(3, 2)
#  nrs                          :integer
#  old_name                     :string(255)
#  some_rejected                :integer
#  tos_flags                    :integer
#  created_at                   :datetime
#  updated_at                   :datetime
#  amzn_requester_id            :string(255)
#

# require 'ruport'
class Requester < ApplicationRecord

#  validates_presence_of :amzn_requester_id
#  validates_uniqueness_of :amzn_requester_id

  has_many :reports
  has_many :flags, :through => :reports

  def has_hidden_reports?
    hidden_report_count > 0
  end

  def hidden_report_count
    reports.select{|r| r.is_hidden}.length
  end

  def report_count
    reports.length
  end

  def reporter_count
    reports.collect{|r| r.person_id}.uniq.length
  end

  def comm
    Report.where(:requester_id => id, :is_hidden => nil).collect{|r| r.comm}.compact.delete_if{|i| i == 0}.mean
  end

  def pay
    Report.where(:requester_id => id, :is_hidden => nil).collect{|r| r.pay}.compact.delete_if{|i| i == 0}.mean
  end

  def fair
    Report.where(:requester_id => id, :is_hidden => nil).collect{|r| r.fair}.compact.delete_if{|i| i == 0}.mean
  end

  def fast
    Report.where(:requester_id => id, :is_hidden => nil).collect{|r| r.fast}.compact.delete_if{|i| i == 0}.mean
  end

  def pay_bucket
    reports = Report.where(:requester_id => id, :is_hidden => nil).collect{|r| r.pay_bucket}.compact.delete_if{|i| i == nil || i == 'n/a'}.reduce({}){|b, a| b.merge({a => (b[a] || 0) + 1})}
    value = nil
    if !reports.empty?
      value = reports.to_buckets_json
    end
    value
  end

  def bucket_counts
    values = Report.where(:requester_id => id, :is_hidden => nil).collect{|r| r.pay_bucket}.compact.delete_if{|i| i == nil || i == 'n/a'}.reduce({}){|b, a| b.merge({a => (b[a] || 0) + 1})}
    if values.empty?
      values = []
    else
      values = Report.pay_buckets.collect{|b| [b, values[b] == nil ? 0 : values[b]]}
    end
    values
  end

  def avg_attrs
    attrs = {}
    Report.requester_attrs.each{|a|
      attrs[a] = Report.where(:requester_id => id).to_a.delete_if{|r| r.is_hidden}.collect { |r| r.public_send(a) }.compact.delete_if{|i| i == 0}.mean
      # pre-hiding version below
      # attrs[a] = Report.where(:requester_id => id).collect { |r| r.public_send(a) }.compact.delete_if{|i| i == 0}.mean
    }
    attrs
  end

  def avg_attrs_avg
    avg_attrs.values.delete_if{|i| i == 0}.mean
  end

  def self.pay_vis(bucket, counts)
    vmax = 5.0
    total = counts.reduce(0){|a,b| a + b[1]}
    index = Report.bucket_bar_val(bucket)
    v = 0
    if index != 0
      v = counts[index - 1][1].to_f / total * 5
    end
    redflag = index <= 2 ? "id='red'" : index <= 3 ? "id='yellow'" : ""
    spch = 30  # number of total &nbsp; characters in meter
    retstr = "<span class='progress-meter'><span class='progress-meter-done' #{redflag}>"
    donefrac = v / vmax
    ndone = donefrac * spch
    ndone = ndone.round
    ndone.times do
      retstr.concat("&nbsp;")
    end
    retstr.concat("</span><span class='progress-meter-undone'>")
    undone = spch - ndone
    undone.times do
      retstr.concat("&nbsp;")
    end
    retstr.concat("</span></span>")
    retstr.html_safe
  end

  def self.attr_vis(v)  # value "v" should be a decimal in [1.0,vmax]
    vmax = 5.0
    if v.nil?
      v = 0.0
    end
    redflag = v <= 2.0 ? "id='red'" : v <= 3.0 ? "id='yellow'" : ""
    spch = 30  # number of total &nbsp; characters in meter
    retstr = "<span class='progress-meter'><span class='progress-meter-done' #{redflag}>"
    donefrac = v / vmax
    ndone = donefrac * spch
    ndone = ndone.round
    ndone.times do
      retstr.concat("&nbsp;")
    end
    retstr.concat("</span><span class='progress-meter-undone'>")
    undone = spch - ndone
    undone.times do
      retstr.concat("&nbsp;")
    end
    retstr.concat("</span></span>")
    retstr.html_safe
  end

  def cache_columns
    self.av_comm = comm
    self.av_pay = pay
    self.av_fair = fair
    self.av_fast = fast
    self.av_pay_bucket = pay_bucket
    self.tos_flags = reports.select{|r| r.tos_viol}.length
    self.ava = avg_attrs_avg
    self.nrs = report_count

    self.all_rejected = reports.select{|rep| rep.rejected == "yes"}.length
    self.some_rejected = reports.select{|rep| rep.rejected == "some"}.length
    self.all_approved_or_pending = reports.select{|rep| rep.rejected == "no"}.length
    self.all_pending_or_didnt_do_hits = reports.select{|rep| rep.rejected == "n/a"}.length

    self.save
  end

end

class Hash
  def to_buckets_json
    Report.pay_buckets.collect{ |bucket| [bucket, self[bucket] == nil ? 0 : self[bucket]] }.to_json
  end
end

class Array
  def mean
    if self.length == 0
      0
    else
      self.inject{|sum, n| sum + n} / self.length.to_f
    end
  end
end
