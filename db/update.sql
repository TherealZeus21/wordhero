/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [Id]
      ,[Name]
      ,[IsFavourite]
      ,[UserId]
      ,[CreatedAt]
      ,[SpidegramData]
  FROM [WebTool].[dbo].[WordHeroes]


  --{"nodes":[],"edges":[]}
  --{"nodes":[{"data":{"id":"sdsa","label":"sdsa"},"group":"nodes"}],"edges":[]}



  select STRING_AGG('{"data":{"id":"'+id+'","label":"'+value+'"},"group":"nodes"}',',')
  FROM [WebTool].[dbo].Words
  where WordHeroId = 1 




  update [WebTool].[dbo].[WordHeroes]
  set SpidegramData = (  
  select '{"nodes":['+STRING_AGG('{"data":{"id":"'+id+'","label":"'+value+'"},"group":"nodes"}',',')+'],"edges":[]}'
  FROM [WebTool].[dbo].Words
  where WordHeroId = [WebTool].[dbo].[WordHeroes].Id
  )

