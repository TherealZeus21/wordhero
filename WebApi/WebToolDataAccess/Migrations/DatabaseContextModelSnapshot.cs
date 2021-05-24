﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebToolDataAccess;

namespace WebToolDataAccess.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebTool.Model.DataAccess.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("WordHeroId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("WordHeroId");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("WebTool.Model.DataAccess.StudentResult", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("StudentName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UpdateTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("WordHeroShareDataId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("WordHeroShareDataId");

                    b.ToTable("StudentResults");
                });

            modelBuilder.Entity("WebTool.Model.DataAccess.WordHeroShareData", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("GroupName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("WordHeroId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("WordHeroId");

                    b.ToTable("WordHeroShareData");
                });

            modelBuilder.Entity("WebTool.Model.DataAccess.WordResult", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("StudentResultId")
                        .HasColumnType("int");

                    b.Property<int>("UseCount")
                        .HasColumnType("int");

                    b.Property<string>("Word")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("StudentResultId");

                    b.ToTable("WordResults");
                });

            modelBuilder.Entity("WebToolDataAccess.Models.Word", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("WordHeroId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("WordHeroId");

                    b.ToTable("Words");
                });

            modelBuilder.Entity("WebToolDataAccess.Models.WordHero", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsFavourite")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SpidegramData")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("WordHeroes");
                });

            modelBuilder.Entity("WebToolDataAccess.Models.WordHeroConfig", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("IsPublic")
                        .HasColumnType("bit");

                    b.Property<int>("LessonId")
                        .HasColumnType("int");

                    b.Property<string>("Preferences")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("LessonId")
                        .IsUnique();

                    b.ToTable("WordHeroConfigs");
                });

            modelBuilder.Entity("WebTool.Model.DataAccess.Question", b =>
                {
                    b.HasOne("WebToolDataAccess.Models.WordHero", "WordHero")
                        .WithMany("Questions")
                        .HasForeignKey("WordHeroId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WebTool.Model.DataAccess.StudentResult", b =>
                {
                    b.HasOne("WebTool.Model.DataAccess.WordHeroShareData", "WordHeroShareData")
                        .WithMany("StudentResults")
                        .HasForeignKey("WordHeroShareDataId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WebTool.Model.DataAccess.WordHeroShareData", b =>
                {
                    b.HasOne("WebToolDataAccess.Models.WordHero", "Lesson")
                        .WithMany("WordHeroShareData")
                        .HasForeignKey("WordHeroId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WebTool.Model.DataAccess.WordResult", b =>
                {
                    b.HasOne("WebTool.Model.DataAccess.StudentResult", null)
                        .WithMany("Result")
                        .HasForeignKey("StudentResultId");
                });

            modelBuilder.Entity("WebToolDataAccess.Models.Word", b =>
                {
                    b.HasOne("WebToolDataAccess.Models.WordHero", "WordHero")
                        .WithMany("Words")
                        .HasForeignKey("WordHeroId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WebToolDataAccess.Models.WordHeroConfig", b =>
                {
                    b.HasOne("WebToolDataAccess.Models.WordHero", "Lesson")
                        .WithOne("LessonConfig")
                        .HasForeignKey("WebToolDataAccess.Models.WordHeroConfig", "LessonId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
