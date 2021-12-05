# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_12_05_222914) do

  create_table "aliases", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "requester_id"
    t.integer "formerly"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "comments", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "report_id"
    t.integer "person_id"
    t.text "body"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text "notes"
    t.text "displayed_notes"
  end

  create_table "flags", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "report_id"
    t.integer "person_id"
    t.text "comment"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text "displayed_notes"
  end

  create_table "follows", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "person_id"
    t.string "follow_type"
    t.integer "follow_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "forum_person_info", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "person_id"
    t.decimal "karma", precision: 5, scale: 2
    t.string "mail_forum_notifications"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "forum_post_versions", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "post_id"
    t.string "ip"
    t.text "title"
    t.text "body"
    t.integer "next"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "person_id"
  end

  create_table "forum_posts", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "person_id"
    t.integer "parent_id"
    t.string "slug"
    t.boolean "sticky"
    t.decimal "score", precision: 5, scale: 2
    t.integer "replies"
    t.integer "views"
    t.string "last_reply_display_name"
    t.string "last_reply_person_id"
    t.integer "last_reply_id"
    t.datetime "last_reply_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "thread_head"
    t.boolean "deleted"
    t.decimal "initial_score", precision: 5, scale: 2
  end

  create_table "ignores", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "person_id"
    t.integer "report_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "notifications", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "person_id"
    t.text "title"
    t.text "body"
    t.boolean "read"
    t.datetime "read_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "people", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "email"
    t.string "hashed_password"
    t.string "salt"
    t.boolean "email_verified"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean "is_admin"
    t.string "display_name"
    t.boolean "is_moderator"
    t.boolean "is_closed"
    t.datetime "closed_at"
    t.boolean "most_recent_first_in_my_reviews"
    t.boolean "can_comment"
    t.boolean "commenting_requested"
    t.datetime "commenting_requested_at"
    t.boolean "commenting_request_ignored"
    t.boolean "order_reviews_by_edit_date"
    t.boolean "show_fancy_links"
    t.integer "commenting_enabled_by"
    t.datetime "commenting_enabled_at"
    t.integer "commenting_disabled_by"
    t.datetime "commenting_disabled_at"
    t.boolean "hide_long_reviews"
    t.string "country"
    t.string "state"
    t.string "phone"
    t.boolean "optin", default: false
    t.datetime "latest_review_at"
    t.datetime "latest_login_at"
    t.boolean "muted"
    t.datetime "muted_until"
    t.integer "muted_by_person_id"
    t.string "confirmation_token"
  end

  create_table "posts", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "person_id"
    t.integer "parent_id"
    t.text "title"
    t.text "body"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string "slug"
    t.boolean "is_sticky"
  end

  create_table "reports", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "person_id"
    t.integer "requester_id"
    t.string "hit_id"
    t.text "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string "how_many_hits"
    t.integer "fair"
    t.integer "fast"
    t.integer "pay"
    t.integer "comm"
    t.boolean "is_flagged"
    t.boolean "is_hidden"
    t.boolean "tos_viol"
    t.string "amzn_requester_id"
    t.text "displayed_notes"
    t.string "amzn_requester_name"
    t.integer "flag_count"
    t.integer "comment_count"
    t.string "ip"
    t.integer "ignore_count", default: 0
    t.text "hit_names"
    t.boolean "dont_censor"
    t.string "rejected"
    t.boolean "locked"
    t.datetime "locked_until"
    t.integer "locked_by_person_id"
    t.string "pay_bucket"
    t.index ["amzn_requester_name"], name: "reports_requester_name_index", type: :fulltext
    t.index ["requester_id"], name: "requester_id_index"
  end

  create_table "reputation_statements", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "person_id"
    t.integer "post_id"
    t.string "statement"
    t.decimal "effect", precision: 3, scale: 2
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string "ip"
  end

  create_table "requesters", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "amzn_requester_id"
    t.string "amzn_requester_name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.decimal "ava", precision: 3, scale: 2
    t.integer "nrs"
    t.decimal "av_comm", precision: 3, scale: 2
    t.decimal "av_pay", precision: 3, scale: 2
    t.decimal "av_fair", precision: 3, scale: 2
    t.decimal "av_fast", precision: 3, scale: 2
    t.integer "tos_flags"
    t.string "old_name"
    t.integer "all_rejected"
    t.integer "some_rejected"
    t.integer "all_approved_or_pending"
    t.integer "all_pending_or_didnt_do_hits"
    t.string "av_pay_bucket"
    t.index ["amzn_requester_id"], name: "amzn_requester_id_index"
  end

  create_table "rules_versions", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.integer "parent_id"
    t.boolean "is_current"
    t.integer "edited_by_person_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text "body"
  end

end
