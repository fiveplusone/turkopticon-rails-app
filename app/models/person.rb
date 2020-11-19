# == Schema Information
# Schema version: 20140610175616
#
# Table name: people
#
#  id                              :integer(4)      not null, primary key
#  email                           :string(255)
#  hashed_password                 :string(255)
#  salt                            :string(255)
#  email_verified                  :boolean(1)
#  created_at                      :datetime
#  updated_at                      :datetime
#  is_admin                        :boolean(1)
#  display_name                    :string(255)
#  is_moderator                    :boolean(1)
#  is_closed                       :boolean(1)
#  closed_at                       :datetime
#  most_recent_first_in_my_reviews :boolean(1)
#

class Person < ApplicationRecord

  has_many :reports
  has_many :flags
  has_many :comments
  has_many :ignores

  validates_presence_of :email
  validates_uniqueness_of :email
  validates_format_of :email, :with => /\A([a-z0-9])([a-z0-9_\-\.\+])*(?!\.{2,})([a-z0-9])\@(?!mailinator|.*mial\.|spamcatch|spambob|spamavert|spamherelots)([a-z0-9])([a-z0-9\-\.])*\.([a-z]{2,4})\z/i, :message => "is not a recognized email address"

  attr_accessor :password_confirmation
  #validates_presence_of :password
  validates_confirmation_of :password

  def verify
    self.update_attributes(:email_verified => true)
  end

  def close
    self.update_attributes(:is_closed => true, :closed_at => Time.now)
  end

  def toggle_order_by_flag
    if self.order_reviews_by_edit_date
      self.order_reviews_by_edit_date = false
    else
      self.order_reviews_by_edit_date = true
    end
    self.save
  end

  def toggle_my_reviews_order_flag
    if self.most_recent_first_in_my_reviews
      self.most_recent_first_in_my_reviews = false
    else
      self.most_recent_first_in_my_reviews = true
    end
    self.save
  end
  
  def before_validation
    self.email = self.email.downcase.strip
  end

  def validate
    errors.add_to_base("Missing password.") if hashed_password.blank?
  end

  def truncated_email
    begin
      e = email.split("@")
      f = e[0]
      g = e[1]
      dn = f[0,f.length/2] + "...@" + g[0,1] + "..."
    rescue Exception
      dn = email
    end
    dn
  end

  def public_email
    if display_name.nil?
      begin
        e = email.split("@")
        f = e[0]
        g = e[1]
        dn = f[0,f.length/2] + "...@" + g[0,1] + "..."
      rescue Exception
        dn = email
      end
    else
      if display_name.empty?
        dn = id.to_s
      else
        dn = display_name.gsub(/[()]/,"")
      end
    end
    if self.is_admin
      dn += " (admin)"
    elsif self.is_moderator
      dn += " (moderator)"
    end
    dn
  end

  def mod_display_name
    dn = display_name.nil? ? email : display_name.gsub(/[()]/,"")
    dn = id.to_s if dn.empty?
    if self.is_admin
      dn += " (admin)"
    else
      dn += " (moderator)" if self.is_moderator
    end
    dn
  end

  def recently_updated_report?
    rv = false
    t = Time.now
    reports.each{|r| rv = true if r.updated_at > (t - 1.month)}
    rv
  end

  def active?
    if reports.blank?
      false
    elsif recently_updated_report?
      true
    else
      false
    end
  end

  def inactive?
    !active?
  end

  def self.active_count
    rv = 0
    Person.find(:all).each{|p| rv += 1 if p.active?}
    rv
  end

	def self.authenticate(email, password)
		person = self.find_by_email(email)
	 	if person
	   	expected_password = encrypted_password(password, person.salt)
	   	if person.hashed_password != expected_password
				person = nil
			end
		end
		person
	end

	def password
		@password
	end

  def password=(pwd)
    if pwd.nil? or pwd.length == 0
      self.salt = nil
      self.hashed_password = nil
    else
      @password = pwd
      create_new_salt
      self.hashed_password = Person.encrypted_password(self.password, self.salt)
    end
  end

  def self.review_commenting_requests_count
    find_all_by_can_comment_and_commenting_requested_and_commenting_request_ignored(nil, true, nil).count
  end

  def self.review_commenting_requests
    find_all_by_can_comment_and_commenting_requested_and_commenting_request_ignored(nil, true, nil).each{|p|
      p.update_attributes(:can_comment => true, :commenting_enabled_at => Time.now, :commenting_enabled_by => 0)
      AdminMailer.enabled(p).deliver_now
    }
  end
	
	private

	def self.encrypted_password(password, salt)
		string_to_hash = password + "foos" + salt
		Digest::SHA1.hexdigest(string_to_hash)
	end

	def create_new_salt
		self.salt = self.object_id.to_s + rand.to_s
  end

  def self.state_long_name(abbreviation)
    state = ''
    unless (abbreviation.nil? or abbreviation == '')
      state = Person.us_states_list.select{|pair| pair[1] == abbreviation}.first.first
    end
    state
  end

  def self.country_long_name(abbreviation)
    country = ''
    unless (abbreviation.nil?)
      country = Person.country_list.select{|pair| pair[1] == abbreviation}.first.first
    end
    country
  end

  def self.country_list
    [ 
      ['Canada', 'CA'], 
      ['India', 'IN'], 
      ['United Kingdom', 'GB'], 
      ['United States', 'US'], 
      ['Afghanistan', 'AF'], 
      ['Aland Islands', 'AX'], 
      ['Albania', 'AL'], 
      ['Algeria', 'DZ'], 
      ['American Samoa', 'AS'], 
      ['AndorrA', 'AD'], 
      ['Angola', 'AO'], 
      ['Anguilla', 'AI'], 
      ['Antarctica', 'AQ'], 
      ['Antigua and Barbuda', 'AG'], 
      ['Argentina', 'AR'], 
      ['Armenia', 'AM'], 
      ['Aruba', 'AW'], 
      ['Australia', 'AU'], 
      ['Austria', 'AT'], 
      ['Azerbaijan', 'AZ'], 
      ['Bahamas', 'BS'], 
      ['Bahrain', 'BH'], 
      ['Bangladesh', 'BD'], 
      ['Barbados', 'BB'], 
      ['Belarus', 'BY'], 
      ['Belgium', 'BE'], 
      ['Belize', 'BZ'], 
      ['Benin', 'BJ'], 
      ['Bermuda', 'BM'], 
      ['Bhutan', 'BT'], 
      ['Bolivia', 'BO'], 
      ['Bosnia and Herzegovina', 'BA'], 
      ['Botswana', 'BW'], 
      ['Bouvet Island', 'BV'], 
      ['Brazil', 'BR'], 
      ['British Indian Ocean Territory', 'IO'], 
      ['Brunei Darussalam', 'BN'], 
      ['Bulgaria', 'BG'], 
      ['Burkina Faso', 'BF'], 
      ['Burundi', 'BI'], 
      ['Cambodia', 'KH'], 
      ['Cameroon', 'CM'], 
      ['Cape Verde', 'CV'], 
      ['Cayman Islands', 'KY'], 
      ['Central African Republic', 'CF'], 
      ['Chad', 'TD'], 
      ['Chile', 'CL'], 
      ['China', 'CN'], 
      ['Christmas Island', 'CX'], 
      ['Cocos (Keeling) Islands', 'CC'], 
      ['Colombia', 'CO'], 
      ['Comoros', 'KM'], 
      ['Congo', 'CG'], 
      ['Congo, The Democratic Republic of the', 'CD'], 
      ['Cook Islands', 'CK'], 
      ['Costa Rica', 'CR'], 
      ['Cote D\'Ivoire', 'CI'], 
      ['Croatia', 'HR'], 
      ['Cuba', 'CU'], 
      ['Cyprus', 'CY'], 
      ['Czech Republic', 'CZ'], 
      ['Denmark', 'DK'], 
      ['Djibouti', 'DJ'], 
      ['Dominica', 'DM'], 
      ['Dominican Republic', 'DO'], 
      ['Ecuador', 'EC'], 
      ['Egypt', 'EG'], 
      ['El Salvador', 'SV'], 
      ['Equatorial Guinea', 'GQ'], 
      ['Eritrea', 'ER'], 
      ['Estonia', 'EE'], 
      ['Ethiopia', 'ET'], 
      ['Falkland Islands (Malvinas)', 'FK'], 
      ['Faroe Islands', 'FO'], 
      ['Fiji', 'FJ'], 
      ['Finland', 'FI'], 
      ['France', 'FR'], 
      ['French Guiana', 'GF'], 
      ['French Polynesia', 'PF'], 
      ['French Southern Territories', 'TF'], 
      ['Gabon', 'GA'], 
      ['Gambia', 'GM'], 
      ['Georgia', 'GE'], 
      ['Germany', 'DE'], 
      ['Ghana', 'GH'], 
      ['Gibraltar', 'GI'], 
      ['Greece', 'GR'], 
      ['Greenland', 'GL'], 
      ['Grenada', 'GD'], 
      ['Guadeloupe', 'GP'], 
      ['Guam', 'GU'], 
      ['Guatemala', 'GT'], 
      ['Guernsey', 'GG'], 
      ['Guinea', 'GN'], 
      ['Guinea-Bissau', 'GW'], 
      ['Guyana', 'GY'], 
      ['Haiti', 'HT'], 
      ['Heard Island and Mcdonald Islands', 'HM'], 
      ['Holy See (Vatican City State)', 'VA'], 
      ['Honduras', 'HN'], 
      ['Hong Kong', 'HK'], 
      ['Hungary', 'HU'], 
      ['Iceland', 'IS'], 
      ['Indonesia', 'ID'], 
      ['Iran, Islamic Republic Of', 'IR'], 
      ['Iraq', 'IQ'], 
      ['Ireland', 'IE'], 
      ['Isle of Man', 'IM'], 
      ['Israel', 'IL'], 
      ['Italy', 'IT'], 
      ['Jamaica', 'JM'], 
      ['Japan', 'JP'], 
      ['Jersey', 'JE'], 
      ['Jordan', 'JO'], 
      ['Kazakhstan', 'KZ'], 
      ['Kenya', 'KE'], 
      ['Kiribati', 'KI'], 
      ['Korea, Democratic People\'S Republic of', 'KP'], 
      ['Korea, Republic of', 'KR'], 
      ['Kuwait', 'KW'], 
      ['Kyrgyzstan', 'KG'], 
      ['Lao People\'S Democratic Republic', 'LA'], 
      ['Latvia', 'LV'], 
      ['Lebanon', 'LB'], 
      ['Lesotho', 'LS'], 
      ['Liberia', 'LR'], 
      ['Libyan Arab Jamahiriya', 'LY'], 
      ['Liechtenstein', 'LI'], 
      ['Lithuania', 'LT'], 
      ['Luxembourg', 'LU'], 
      ['Macao', 'MO'], 
      ['Macedonia, The Former Yugoslav Republic of', 'MK'], 
      ['Madagascar', 'MG'], 
      ['Malawi', 'MW'], 
      ['Malaysia', 'MY'], 
      ['Maldives', 'MV'], 
      ['Mali', 'ML'], 
      ['Malta', 'MT'], 
      ['Marshall Islands', 'MH'], 
      ['Martinique', 'MQ'], 
      ['Mauritania', 'MR'], 
      ['Mauritius', 'MU'], 
      ['Mayotte', 'YT'], 
      ['Mexico', 'MX'], 
      ['Micronesia, Federated States of', 'FM'], 
      ['Moldova, Republic of', 'MD'], 
      ['Monaco', 'MC'], 
      ['Mongolia', 'MN'], 
      ['Montserrat', 'MS'], 
      ['Morocco', 'MA'], 
      ['Mozambique', 'MZ'], 
      ['Myanmar', 'MM'], 
      ['Namibia', 'NA'], 
      ['Nauru', 'NR'], 
      ['Nepal', 'NP'], 
      ['Netherlands', 'NL'], 
      ['Netherlands Antilles', 'AN'], 
      ['New Caledonia', 'NC'], 
      ['New Zealand', 'NZ'], 
      ['Nicaragua', 'NI'], 
      ['Niger', 'NE'], 
      ['Nigeria', 'NG'], 
      ['Niue', 'NU'], 
      ['Norfolk Island', 'NF'], 
      ['Northern Mariana Islands', 'MP'], 
      ['Norway', 'NO'], 
      ['Oman', 'OM'], 
      ['Pakistan', 'PK'], 
      ['Palau', 'PW'], 
      ['Palestinian Territory, Occupied', 'PS'], 
      ['Panama', 'PA'], 
      ['Papua New Guinea', 'PG'], 
      ['Paraguay', 'PY'], 
      ['Peru', 'PE'], 
      ['Philippines', 'PH'], 
      ['Pitcairn', 'PN'], 
      ['Poland', 'PL'], 
      ['Portugal', 'PT'], 
      ['Puerto Rico', 'PR'], 
      ['Qatar', 'QA'], 
      ['Reunion', 'RE'], 
      ['Romania', 'RO'], 
      ['Russian Federation', 'RU'], 
      ['RWANDA', 'RW'], 
      ['Saint Helena', 'SH'], 
      ['Saint Kitts and Nevis', 'KN'], 
      ['Saint Lucia', 'LC'], 
      ['Saint Pierre and Miquelon', 'PM'], 
      ['Saint Vincent and the Grenadines', 'VC'], 
      ['Samoa', 'WS'], 
      ['San Marino', 'SM'], 
      ['Sao Tome and Principe', 'ST'], 
      ['Saudi Arabia', 'SA'], 
      ['Senegal', 'SN'], 
      ['Serbia and Montenegro', 'CS'], 
      ['Seychelles', 'SC'], 
      ['Sierra Leone', 'SL'], 
      ['Singapore', 'SG'], 
      ['Slovakia', 'SK'], 
      ['Slovenia', 'SI'], 
      ['Solomon Islands', 'SB'], 
      ['Somalia', 'SO'], 
      ['South Africa', 'ZA'], 
      ['South Georgia and the South Sandwich Islands', 'GS'], 
      ['Spain', 'ES'], 
      ['Sri Lanka', 'LK'], 
      ['Sudan', 'SD'], 
      ['Suriname', 'SR'], 
      ['Svalbard and Jan Mayen', 'SJ'], 
      ['Swaziland', 'SZ'], 
      ['Sweden', 'SE'], 
      ['Switzerland', 'CH'], 
      ['Syrian Arab Republic', 'SY'], 
      ['Taiwan, Province of China', 'TW'], 
      ['Tajikistan', 'TJ'], 
      ['Tanzania, United Republic of', 'TZ'], 
      ['Thailand', 'TH'], 
      ['Timor-Leste', 'TL'], 
      ['Togo', 'TG'], 
      ['Tokelau', 'TK'], 
      ['Tonga', 'TO'], 
      ['Trinidad and Tobago', 'TT'], 
      ['Tunisia', 'TN'], 
      ['Turkey', 'TR'], 
      ['Turkmenistan', 'TM'], 
      ['Turks and Caicos Islands', 'TC'], 
      ['Tuvalu', 'TV'], 
      ['Uganda', 'UG'], 
      ['Ukraine', 'UA'], 
      ['United Arab Emirates', 'AE'], 
      ['United States Minor Outlying Islands', 'UM'], 
      ['Uruguay', 'UY'], 
      ['Uzbekistan', 'UZ'], 
      ['Vanuatu', 'VU'], 
      ['Venezuela', 'VE'], 
      ['Viet Nam', 'VN'], 
      ['Virgin Islands, British', 'VG'], 
      ['Virgin Islands, U.S.', 'VI'], 
      ['Wallis and Futuna', 'WF'], 
      ['Western Sahara', 'EH'], 
      ['Yemen', 'YE'], 
      ['Zambia', 'ZM'], 
      ['Zimbabwe', 'ZW']
    ]
  end

  def self.us_states_list
    [
      ['Alabama', 'AL'],
      ['Alaska', 'AK'],
      ['American Samoa', 'AS'],
      ['Arizona', 'AZ'],
      ['Arkansas', 'AR'],
      ['California', 'CA'],
      ['Colorado', 'CO'],
      ['Connecticut', 'CT'],
      ['Delaware', 'DE'],
      ['District Of Columbia', 'DC'],
      ['Federated States Of Micronesia', 'FM'],
      ['Florida', 'FL'],
      ['Georgia', 'GA'],
      ['Guam', 'GU'],
      ['Hawaii', 'HI'],
      ['Idaho', 'ID'],
      ['Illinois', 'IL'],
      ['Indiana', 'IN'],
      ['Iowa', 'IA'],
      ['Kansas', 'KS'],
      ['Kentucky', 'KY'],
      ['Louisiana', 'LA'],
      ['Maine', 'ME'],
      ['Marshall Islands', 'MH'],
      ['Maryland', 'MD'],
      ['Massachusetts', 'MA'],
      ['Michigan', 'MI'],
      ['Minnesota', 'MN'],
      ['Mississippi', 'MS'],
      ['Missouri', 'MO'],
      ['Montana', 'MT'],
      ['Nebraska', 'NE'],
      ['Nevada', 'NV'],
      ['New Hampshire', 'NH'],
      ['New Jersey', 'NJ'],
      ['New Mexico', 'NM'],
      ['New York', 'NY'],
      ['North Carolina', 'NC'],
      ['North Dakota', 'ND'],
      ['Northern Mariana Islands', 'MP'],
      ['Ohio', 'OH'],
      ['Oklahoma', 'OK'],
      ['Oregon', 'OR'],
      ['Palau', 'PW'],
      ['Pennsylvania', 'PA'],
      ['Puerto Rico', 'PR'],
      ['Rhode Island', 'RI'],
      ['South Carolina', 'SC'],
      ['South Dakota', 'SD'],
      ['Tennessee', 'TN'],
      ['Texas', 'TX'],
      ['Utah', 'UT'],
      ['Vermont', 'VT'],
      ['Virgin Islands', 'VI'],
      ['Virginia', 'VA'],
      ['Washington', 'WA'],
      ['West Virginia', 'WV'],
      ['Wisconsin', 'WI'],
      ['Wyoming', 'WY'],
    ]
  end

end
