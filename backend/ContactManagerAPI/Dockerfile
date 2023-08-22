#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["ContactManagerAPI/ContactManagerAPI.csproj", "ContactManagerAPI/"]
COPY ["ContactManagerAPI.Repositories/ContactManagerAPI.Repositories.csproj", "ContactManagerAPI.Repositories/"]
COPY ["ContactManagerAPI.Entities/ContactManagerAPI.Entities.csproj", "ContactManagerAPI.Entities/"]
COPY ["ContactManagerAPI.Services/ContactManagerAPI.Services.csproj", "ContactManagerAPI.Services/"]
COPY ["ContactManagerAPI.Utils/ContactManagerAPI.Utils.csproj", "ContactManagerAPI.Utils/"]
RUN dotnet restore "ContactManagerAPI/ContactManagerAPI.csproj"
COPY . .
WORKDIR "/src/ContactManagerAPI"
RUN dotnet build "ContactManagerAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ContactManagerAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ContactManagerAPI.dll"]