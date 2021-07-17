# frozen_string_literal: true

class ReportsView
  Pagination = Struct.new(:current_page, :total_pages, keyword_init: true)

  attr_reader :reports

  def initialize(reports, current_user:, order: nil, paginate: false, page: nil)
    if order
      reports = reports.order(**order)
    else
      order_param = current_user.order_reviews_by_edit_date? ? :updated_at : :id
      reports = reports.order(order_param => :desc)
    end

    if paginate
      reports = reports.paginate(page: page)
      @pagination = Pagination.new(current_page: reports.current_page, total_pages: reports.total_pages).freeze
    end

    reports = reports.includes(:requester, :person, flags: :person, comments: :person)

    reports.load

    current_user_flag_ids = Flag.where(report: reports.ids, person: current_user).pluck(:report_id, :id).to_h

    @reports = reports.map do |report|
      ReportView.new(report, current_user_flag_id: current_user_flag_ids[report.id])
    end
  end

  def pagination
    @pagination || raise('Pagination is not configured')
  end

  def paginate?
    !@pagination.nil?
  end
end
