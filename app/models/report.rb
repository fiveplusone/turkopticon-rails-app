# == Schema Information
#
# Table name: reports
#
#  id                  :integer          not null, primary key
#  amzn_requester_name :string(255)
#  comm                :integer
#  comment_count       :integer
#  description         :text(16777215)
#  displayed_notes     :text(16777215)
#  dont_censor         :boolean
#  fair                :integer
#  fast                :integer
#  flag_count          :integer
#  hit_names           :text(16777215)
#  how_many_hits       :string(255)
#  ignore_count        :integer          default(0)
#  ip                  :string(255)
#  is_flagged          :boolean
#  is_hidden           :boolean
#  locked              :boolean
#  locked_until        :datetime
#  pay                 :integer
#  pay_bucket          :string(255)
#  rejected            :string(255)
#  tos_viol            :boolean
#  created_at          :datetime
#  updated_at          :datetime
#  amzn_requester_id   :string(255)
#  hit_id              :string(255)
#  locked_by_person_id :integer
#  person_id           :integer
#  requester_id        :integer
#

class Report < ApplicationRecord

  belongs_to :person
  belongs_to :requester, :optional => true
  has_many :flags
  has_many :comments
  has_many :ignores

  def update_flag_data
    nflags = flags.length
    mod_flagged = false
    flags.each{|f| mod_flagged = true if f.person.is_moderator}
    if mod_flagged and nflags > 1 and flags.first.person_id != flags.last.person_id
      self.is_hidden = true
    else
      self.is_hidden = nil
    end
    if nflags > 0
      self.is_flagged = true
    else
      self.is_flagged = nil
    end
    self.save
    self.requester.cache_columns
  end

  def print_h
    r = "id: " + id.to_s
    r += ", person_id: " + person_id.to_s
    r += ", person_email: " + person.email
    r += ", requester_id: " + requester_id.to_s
    r += ", requester_name: " + requester.amzn_requester_name unless requester_id.nil?
    r += ", description: '" + description + "'"
    r += ", fair: " + fair.to_s
    r += ", fast: " + fast.to_s
    r += ", pay: " + pay.to_s
    r += ", comm: " + comm.to_s
  end

  def requester_amzn_id
    requester.nil? ? "" : requester.amzn_requester_id
  end

  def requester_amzn_name
    if amzn_requester_name.nil?
      requester.nil? ? "" : requester.amzn_requester_name
    else
      amzn_requester_name
    end
  end

  def self.requester_attrs
    # ["fair", "fast", "pay", "comm"]
    ["fair", "fast", "comm"]
  end

  def self.question(attr)
    case attr
      when "fair"
        "How fair has this requester been in approving or rejecting your work?"
      when "fast"
        "How promptly has this requester approved your work and paid?"
      when "pay"
        "How well has this requester paid for the amount of time their HITs take?"
      when "comm"
        "How responsive has this requester been to communications or concerns you have raised?"
    end
  end

  def self.how_many_hits_ranges
    ["None", "1 - 5", "6 - 20", "21 - 100", "101+"]
  end

  def self.pay_buckets
    # increasing order
    ["$0-$4", "$4-$7", "$7-$10", "$10-$15", "$15+"]
  end

  def self.bucket_bar_val(bucket)
    # increasing order
    pay_buckets.index(bucket) == nil ? 0 : pay_buckets.index(bucket) + 1
  end

end

class String
  def censor
    self.gsub(/[^A-Za-z]ass[^A-Za-z]|asshole|jackass|retard/i,"[rearward-facing primate orifice]").gsub(/fck|fuck|[^A-Za-z]cunt[^A-Za-z]|shit|douche|bitch|nigger|dick|prick/i,"[delightful bamboo-eating panda]").gsub(/faggot|[^A-Za-z]fag[^A-Za-z]|phaggot|idiot|mofo/i,"[the person I love the most]").gsub(/dumb|asinine|stupid/i,"[inspiring]")
  end
end
