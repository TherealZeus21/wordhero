using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebTool.Model.DataAccess;
using WebTool.Model.DTO;
using WebToolDataAccess.Models;

namespace WebApi
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<WordHero, WordHeroListDto>()
                .ForMember(x => x.WordsCount, opt => opt.MapFrom(src => src.Words.Count));

            CreateMap<WordHero, WordHeroDto>().PreserveReferences()
                .ForMember(x => x.Title, opt => opt.MapFrom(src => src.Name))
                .ForMember(x => x.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt))
                .ForMember(x => x.Questions, opt => opt.MapFrom(src => src.Questions.Select(x => x.Content)))
                .ForMember(x => x.Words, opt => opt.MapFrom(src => src.Words))
                .ForMember(x => x.WordHeroConfig, opt => opt.MapFrom(src => src.LessonConfig));


            CreateMap<WordHero, WordHeroExercise>()
                .ForMember(x => x.WordHeroId, opt => opt.MapFrom(src => src.Id))
                .ForMember(x => x.Name, opt => opt.MapFrom(src => src.Name))
                 .ForMember(x => x.Words, opt => opt.MapFrom(src => src.Words.Select(z => z.Value)))
                 .ForMember(x => x.WordHeroConfig, opt => opt.MapFrom(src => src.LessonConfig));

            CreateMap<WordHeroConfig, LessonConfigDto>();


            CreateMap<StudentResult, UserResult>()
                .ForMember(x => x.Name, opt => opt.MapFrom(src => src.StudentName))
                 .ForMember(x => x.Words, opt => opt.MapFrom(src => src.Result));

            CreateMap<WordHero, WordHeroShareSpidegram>()
            .ForMember(x => x.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(x => x.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(x => x.SpidegramData, opt => opt.MapFrom(src => src.SpidegramData))
            .ForMember(x => x.Questions, opt => opt.MapFrom(src => src.Questions.Select(x => x.Content)))
            .ForMember(x => x.WordHeroConfig, opt => opt.MapFrom(src => src.LessonConfig));


            CreateMap<WordHeroConfig, WordHeroConfigDTO>();
            CreateMap<Word, WordDTO>();

            CreateMap<WordDTO, Word>();
            CreateMap<WordHeroConfigDTO, WordHeroConfig>();

            CreateMap<WordHeroShareData, WordHeroShareGroupsDto>();


        }
    }
}
