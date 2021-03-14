class NotificationMailer < ApplicationMailer

  def notification(n)
    @subject = '[turkopticon] ' + n.title
    @body = n.body
    @recipients = n.person.email
    @from = 'turkopticon@ucsd.edu'
    @bcc = 'turkopticon.maint@gmail.com'
    @sent_on = Time.now
    @headers = {}
    mail(from: @from, to: @recipients, bcc: @bcc, subject: @subject)
  end

  def digest
    @subject = '[turkopticon-discuss] ' + 'Notifications digest'

    @recipients = n.person.email
    @from = 'turkopticon@ucsd.edu'
    @bcc = 'turkopticon.maint@gmail.com'
    @sent_on = Time.now
    @headers = {}
    mail(from: @from, to: @recipients, bcc: @bcc, subject: @subject)
  end

end
