package models

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type User struct {
	UserID     uint          `gorm:"primaryKey;autoIncrement" json:"id"`
	Name       *string       `gorm:"type:varchar(255)" json:"name"`
	Email      string        `gorm:"type:varchar(255);unique;not null" json:"email"`
	Password   string        `gorm:"type:varchar(255);not null" json:"password"`
	Preference *string       `gorm:"type:varchar(255);" json:"preference"`
	Intake     int           `gorm:"type:int" json:"intake"`
	MPD        int           `gorm:"type:int" json:"mpd"`
	IngID      pq.Int64Array `gorm:"type:integer[]" json:"ingid"`
	RecID      pq.Int64Array `gorm:"type:integer[]" json:"recid"`
}

func MigrateUser(db *gorm.DB) error {
	err := db.AutoMigrate(&User{})
	return err
}
