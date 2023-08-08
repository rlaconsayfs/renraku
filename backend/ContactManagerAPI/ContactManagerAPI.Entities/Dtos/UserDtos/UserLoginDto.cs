﻿using System.ComponentModel.DataAnnotations;

namespace ContactManagerAPI.Entities.Dtos.UserDtos
{
    public class UserLoginDto
    {
        [Required]
        [MaxLength(50)]
        public string Username { get; set; }

        [Required]
        [MaxLength(200)]
        public string Password { get; set; }
    }
}
