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
    @scores = {}
    %w[comm pay fair fast].each do |attr|
      reports = Report.where.not(attr => nil).where("#{attr} > 0")
      @scores[attr] = Hash.new(0).merge(reports.group(attr).count)
    end
  end

end
