using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace shipmanagement.viewmodels
{
    public class Ship
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [MaxLength(250, ErrorMessage = "Name cannot be greater than 250 characters")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Length is required")]
        [Range(1,int.MaxValue,ErrorMessage = "Length should be between 1 - 2,147,483,647")]
        [RegularExpression(@"\d+(\.\d{1,2})?", ErrorMessage = "Invalid length! Supported format is 2212.23")]
        public decimal Length { get; set; }
        [Range(1, int.MaxValue, ErrorMessage = "Width should be between 1 - 2,147,483,647")]
        [RegularExpression(@"\d+(\.\d{1,2})?", ErrorMessage = "Invalid width! Supported format is 2212.23")]
        [Required(ErrorMessage = "Width is required")]
        public decimal Width { get; set; }

        [Required(ErrorMessage = "Code is required")]
        [MaxLength(250, ErrorMessage = "Code cannot be greater than 15 characters")]
        public string Code { get; set; }
    }
}
