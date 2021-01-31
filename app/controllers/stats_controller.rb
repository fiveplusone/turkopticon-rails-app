class StatsController < ApplicationController

  before_action :authorize
  layout nil

  # This link is given to people when they want stats about turkopticon
  def index
    @reviews = Report.count
    tos_viol_reps = Report.where(:tos_viol => true)
    @tos_flags = tos_viol_reps.count
    @requesters = Requester.count
    @reqs_with_tos_flags = tos_viol_reps.distinct.count(:requester_id)
    @users = Person.count
    @posting_users = Report.all.distinct.count(:person_id)
  end

  def reviews
    reports = Report.all
    @scores = {}
    attrs = %w{comm pay fair fast}
    attrs.each{|attr| @scores[attr] = {} }
    [1, 2, 3, 4, 5].each{|i| attrs.each{|attr| @scores[attr][i] = 0}}
    reports.each{|r|
      attrs.each{|attr|
        attr_val = r.public_send(attr)
        @scores[attr][attr_val] += 1 unless attr_val.nil? or attr_val == 0
      }
    }
  end

end
