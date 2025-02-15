package models

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Recipe struct {
	RecipeID     uint          `gorm:"primaryKey;autoIncrement" json:"id"`
	Image        *string       `gorm:"type:varchar(255)" json:"image"`
	Name         *string       `gorm:"type:varchar(255)" json:"name"`
	Instruction  string        `gorm:"type:varchar(255)" json:"instruction"`
	CookingtTime int           `gorm:"type:int" json:"cooking_time"`
	Happy        int           `gorm:"type:int" json:"happy"`
	Calories     int           `gorm:"type:int" json:"calories"`
	IngID        pq.Int64Array `gorm:"type:integer[]" json:"ingid"`
}

func MigrateRecipe(db *gorm.DB) error {
	err := db.AutoMigrate(&Recipe{})
	return err
}
