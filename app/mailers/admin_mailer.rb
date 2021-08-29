class AdminMailer < ApplicationMailer

  def enabled(person)
    @subject    = '[turkopticon] Commenting enabled'
    @recipients = person.email
    @sent_on    = Time.now
    @headers    = {}
    mail(to: @recipients, subject: @subject)
  end

  def declined(person)
    @subject    = '[turkopticon] Commenting request declined for now'
    @recipients = person.email
    @sent_on    = Time.now
    @headers    = {}
    mail(to: @recipients, subject: @subject)
  end

  def report(out)
    @subject    = '[turkopticon] Commenting requests reviewed'
    @recipients = 'silberman.six@gmail.com'
    @report     = out
    @sent_on    = Time.now
    @headers    = {}
    mail(to: @recipients, subject: @subject)
  end

  def facilitator(id, recipient_email)
    @subject    = '[turkopticon] Call for help reorganizing Turkopticon'
    @recipients = recipient_email
    @id         = id
    @sent_on    = Time.now
    @headers    = {}
    mail(to: @recipients, subject: @subject)
  end

  def facilitator_followup(recipient_email)
    @subject    = '[future of turkopticon] Thank you!'
    @recipients = recipient_email
    @email      = recipient_email
    @sent_on    = Time.now
    @headers    = {}
    mail(to: @recipients, subject: @subject)
  end

  def workshopinfo(recipient_email)
    @subject    = '[future of turkopticon] Organizing workshop update'
    @recipients = recipient_email
    @email      = recipient_email
    @sent_on    = Time.now
    @headers    = {}
    mail(to: @recipients, subject: @subject)
  end


end
