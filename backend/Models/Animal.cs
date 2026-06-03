using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Animais")]
    public class Animal
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Nome { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Especie { get; set; } = string.Empty;

        [Required]
        public int Idade { get; set; }

        [Required]
        [StringLength(20)]
        public string TelefoneDono { get; set; } = string.Empty;
    }
}
