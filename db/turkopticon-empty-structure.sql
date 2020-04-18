
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `report_id` int(11) DEFAULT NULL,
  `person_id` int(11) DEFAULT NULL,
  `body` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21666 DEFAULT CHARSET=latin1;


CREATE TABLE `flags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `report_id` int(11) DEFAULT NULL,
  `person_id` int(11) DEFAULT NULL,
  `comment` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3152 DEFAULT CHARSET=latin1;


CREATE TABLE `people` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `hashed_password` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `email_verified` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT NULL,
  `display_name` varchar(255) DEFAULT NULL,
  `is_moderator` tinyint(1) DEFAULT NULL,
  `is_closed` tinyint(1) DEFAULT NULL,
  `closed_at` datetime DEFAULT NULL,
  `most_recent_first_in_my_reviews` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28465 DEFAULT CHARSET=latin1;


CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `title` text,
  `body` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=latin1;


CREATE TABLE `reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) DEFAULT NULL,
  `requester_id` int(11) DEFAULT NULL,
  `hit_id` varchar(255) DEFAULT NULL,
  `description` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `how_many_hits` varchar(255) DEFAULT NULL,
  `fair` int(11) DEFAULT NULL,
  `fast` int(11) DEFAULT NULL,
  `pay` int(11) DEFAULT NULL,
  `comm` int(11) DEFAULT NULL,
  `is_flagged` tinyint(1) DEFAULT NULL,
  `is_hidden` tinyint(1) DEFAULT NULL,
  `tos_viol` tinyint(1) DEFAULT NULL,
  `amzn_requester_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116871 DEFAULT CHARSET=latin1;


CREATE TABLE `requesters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amzn_requester_id` varchar(255) DEFAULT NULL,
  `amzn_requester_name` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `ava` decimal(3,2) DEFAULT NULL,
  `nrs` int(11) DEFAULT NULL,
  `av_comm` decimal(3,2) DEFAULT NULL,
  `av_pay` decimal(3,2) DEFAULT NULL,
  `av_fair` decimal(3,2) DEFAULT NULL,
  `av_fast` decimal(3,2) DEFAULT NULL,
  `tos_flags` int(11) DEFAULT NULL,
  `old_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24639 DEFAULT CHARSET=latin1;

