-- Create the new `users` table
CREATE TABLE `users` (
  `StaffNum` VARCHAR(50)    NOT NULL,
  `Username` VARCHAR(255)   NOT NULL UNIQUE,
  `Password` VARCHAR(255)   NOT NULL,
  `isAdmin` TINYINT(1)      NOT NULL DEFAULT 0,
  `Active`  TINYINT(1)      NOT NULL DEFAULT 0,
  PRIMARY KEY (`StaffNum`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- Locations master table
CREATE TABLE `locations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Location records linking users to locations
CREATE TABLE `location_records` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `staffNum` VARCHAR(50) NOT NULL,
  `location_id` INT NOT NULL,
  `start_time` DATETIME NOT NULL,
  `end_time` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_records_staffnum` (`staffNum`),
  INDEX `idx_records_location` (`location_id`),
  CONSTRAINT `fk_records_user`
    FOREIGN KEY (`staffNum`) REFERENCES `users` (`StaffNum`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_records_location`
    FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `locations` (`name`) VALUES
  ('Alwyn Hall'),
  ('Beech Glade'),
  ('Bowers Building'),
  ('Burma Road Student Village'),
  ('Centre for Sport'),
  ('Chapel'),
  ('The Cottage'),
  ('Fred Wheeler Building'),
  ('Herbert Jarman Building'),
  ('Holm Lodge'),
  ('Kenneth Kettle Building'),
  ('King Alfred Centre'),
  ('Martial Rose Library'),
  ('Masters Lodge'),
  ('Medecroft'),
  ('Medecroft Annexe'),
  ('Paul Chamberlain Building'),
  ('Queen’s Road Student Village'),
  ('St Alphege'),
  ('St Edburga'),
  ('St Elizabeth’s Hall'),
  ('St Grimbald’s Court'),
  ('St James’ Hall'),
  ('St Swithun’s Lodge'),
  ('The Stripe'),
  ('Business School'),
  ('Tom Atkinson Building'),
  ('West Downs Centre'),
  ('West Downs Student Village'),
  ('Winton Building'),
  ('Students’ Union');
