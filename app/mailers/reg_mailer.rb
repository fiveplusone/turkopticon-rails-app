class RegMailer < ApplicationMailer

  @@send_bcc = true

  def confirm(person, hash)
    @subject    = '[turkopticon] Please confirm your email address'
    @hash       = hash
    @recipients = person.email
    @from       = 'turkopticon@ucsd.edu'
    @bcc        = 'turkopticon.maint@gmail.com' if @@send_bcc
    @sent_on    = Time.now
    @headers    = {}
    mail(from: @from, to: @recipients, bcc: @bcc, subject: @subject)
  end

  def password_reset(person, new_password)
    @subject      = '[turkopticon] Your password was reset'
    @new_password = new_password
    @recipients   = person.email
    @from         = 'turkopticon@ucsd.edu'
    @bcc          = 'turkopticon.maint@gmail.com' if @@send_bcc
    @sent_on      = Time.now
    @headers      = {}
    mail(from: @from, to: @recipients, bcc: @bcc, subject: @subject)
  end

  def password_change(person, new_password)
    @subject      = '[turkopticon] Your password was changed'
    @new_password = new_password
    @recipients   = person.email
    @from         = 'turkopticon@ucsd.edu'
    @bcc          = 'turkopticon.maint@gmail.com' if @@send_bcc
    @sent_on      = Time.now
    @headers      = {}
    mail(from: @from, to: @recipients, bcc: @bcc, subject: @subject)
  end

end
