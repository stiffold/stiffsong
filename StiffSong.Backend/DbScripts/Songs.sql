create table Songs(
	Id bigint primary key identity,
	Title nvarchar(2000) null,
	Lyrics nvarchar(max) null,
	Folder nvarchar(100) null,
	LastUsed datetime2 null
)

alter table dbo.songs add ChordsImage varbinary(max);
alter table dbo.songs add ChordsText nvarchar(max);


create table Images(
                      Id bigint primary key identity,
                      ImageType nvarchar(20) null,
                      ImageData varbinary(max) null,
                      RelatedSongId bigint null,
                      LastUsed datetime2 null
)

create table Setups(
                       Id bigint primary key identity,
                       Songs nvarchar(max) null,
                       Images nvarchar(max) null,
                       Videos nvarchar(max) null,
                       Configuration nvarchar(max) null,
                       LastUsed datetime2 null
)

alter table dbo.Images add PreviewImageData varbinary(max) null;