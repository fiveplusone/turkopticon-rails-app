class AdminMailer < ApplicationMailer

  @@send_bcc = true

  def enabled(person)
    @subject    = '[turkopticon] Commenting enabled'
    @recipients = person.email
    @from       = 'turkopticon@ucsd.edu'
    @bcc        = 'turkopticon.maint@gmail.com' if @@send_bcc
    @sent_on    = Time.now
    @headers    = {}
  end

  def declined(person)
    @subject    = '[turkopticon] Commenting request declined for now'
    @recipients = person.email
    @from       = 'turkopticon@ucsd.edu'
    @bcc        = 'turkopticon.maint@gmail.com' if @@send_bcc
    @sent_on    = Time.now
    @headers    = {}
  end

  def report(out)
    @subject    = '[turkopticon] Commenting requests reviewed'
    @recipients = 'silberman.six@gmail.com'
    @body["report"] = out
    @from       = 'turkopticon@ucsd.edu'
    @bcc        = 'turkopticon.maint@gmail.com' if @@send_bcc
    @sent_on    = Time.now
    @headers    = {}
  end

  def facilitator(id, recipient_email)
    @subject    = '[turkopticon] Call for help reorganizing Turkopticon'
    @recipients = recipient_email
    @body["id"] = id
    @from       = 'turkopticon@ucsd.edu'
    @bcc        = 'turkopticon.maint@gmail.com' if @@send_bcc
    @sent_on    = Time.now
    @headers    = {}
  end

  def facilitator_followup(recipient_email)
    @subject    = '[future of turkopticon] Thank you!'
    @recipients = recipient_email
    @body["email"] = recipient_email
    @from       = 'turkopticon@ucsd.edu'
    @bcc        = 'turkopticon.maint@gmail.com' if @@send_bcc
    @sent_on    = Time.now
    @headers    = {}
  end

  def workshopinfo(recipient_email)
    @subject    = '[future of turkopticon] Organizing workshop update'
    @recipients = recipient_email
    @body["email"] = recipient_email
    @from       = 'turkopticon@ucsd.edu'
    @bcc        = 'turkopticon.maint@gmail.com' if @@send_bcc
    @sent_on    = Time.now
    @headers    = {}
  end


end
