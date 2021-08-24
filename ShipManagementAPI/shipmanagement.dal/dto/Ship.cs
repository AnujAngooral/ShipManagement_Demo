using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace shipmanagement.dal.dto
{
    [Table("Ship")]
    public class Ship
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [MaxLength(250, ErrorMessage = "Name cannot be greater than 250 characters")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Length is required")]
        public decimal Length { get; set; }

        [Required(ErrorMessage = "Width is required")]
        public decimal Width { get; set; }

        [Required(ErrorMessage = "Code is required")]
        [MaxLength(250, ErrorMessage = "Code cannot be greater than 15 characters")]
        public string Code { get; set; }
    }
}
