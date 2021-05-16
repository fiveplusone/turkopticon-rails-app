class NotificationMailer < ApplicationMailer

  def notification(n)
    @subject = '[turkopticon] ' + n.title
    @body = n.body
    @recipients = n.person.email
    @from = 'turkopticon@ucsd.edu'
    @sent_on = Time.now
    @headers = {}
    mail(from: @from, to: @recipients, subject: @subject)
  end

  def digest
    @subject = '[turkopticon-discuss] ' + 'Notifications digest'

    @recipients = n.person.email
    @from = 'turkopticon@ucsd.edu'
    @sent_on = Time.now
    @headers = {}
    mail(from: @from, to: @recipients, subject: @subject)
  end

end
