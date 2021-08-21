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
        
        public int Length { get; set; }

        [Required(ErrorMessage = "Width is required")]
        public int Width { get; set; }

        [Required(ErrorMessage = "Code is required")]
        [MaxLength(250, ErrorMessage = "Code cannot be greater than 15 characters")]
        public string Code { get; set; }
    }
}
