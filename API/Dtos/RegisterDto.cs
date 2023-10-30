using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class RegisterDto
    {
        public required string DisplayName { get; set; }

        public required string Email { get; set; }

        public required string Password { get; set; }
    }
}