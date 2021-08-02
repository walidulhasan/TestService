using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace TestService.CustomValidation
{
    public class UpperCaseAttribute : ValidationAttribute
    {
        //UpperCase
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value != null)
            {
                string suppliedValue = (string)value;
                var hasUpperChar = new Regex(@"[A-Z]+");
                var match = hasUpperChar.IsMatch(suppliedValue);
                if (match == false)
                {
                    return new ValidationResult("Input Should Have Uppercase ");
                }
            }
            return ValidationResult.Success;
        }
    }
}