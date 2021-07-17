# frozen_string_literal: true

class ReportView < SimpleDelegator
  attr_reader :current_user_flag_id

  def initialize(report, current_user_flag_id: nil)
    super(report)
    @current_user_flag_id = current_user_flag_id
  end
end
