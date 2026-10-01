// QUICK SETUP REFERENCE //////////////////////////////////////////////////////
// 1) Copy and replace game content ID. ///
// 2) Copy and replace property content ID. ///
// 3) Copy and replace top score ID.  ///
// 4) Copy and replace forum service calls ///
// 5) Make sure game genre in dsRelatedGames matches that of this property ///
///////////////////////////////////////////////////////////////////////////////



// THIS GAME //////////////////////
// dsThisGame needs to have the content ID changed to match the content ID of this game. ///
var dsThisGame = new Spry.Data.XMLDataSet("/cnservice/cartoonsvc/content/xml/getContentById.do?contentId=43801", "Game");
var dsControls = new Spry.Data.NestedXMLDataSet(dsThisGame, "Game_Controls");
//////////////////////



// TOP SCORES FOR THIS GAME /////////////////
// These datasets all need to have the top score ID changed to match the value that is in the CMA.  ex: cn_moldrush6 ///
var dsTopScoresThisWeek = new Spry.Data.XMLDataSet("/cnservice/cartoonsvc/views/data/cnleaderboard.jsp?type=global&timeframe=this_week&gameid=cn_moldrush6", "board/entry", {useCache: false });
var dsTopScoresThisMonth = new Spry.Data.XMLDataSet("/cnservice/cartoonsvc/views/data/cnleaderboard.jsp?type=global&timeframe=this_month&gameid=cn_moldrush6", "board/entry", {useCache: false });
var dsTopScoresThisYear = new Spry.Data.XMLDataSet("/cnservice/cartoonsvc/views/data/cnleaderboard.jsp?type=global&timeframe=this_year&gameid=cn_moldrush6", "board/entry", {useCache: false });
var dsTopScoresAllTime = new Spry.Data.XMLDataSet("/cnservice/cartoonsvc/views/data/cnleaderboard.jsp?type=global&timeframe=all_time&gameid=cn_moldrush6", "board/entry", {useCache: false });
var dsShell = new Spry.Data.DataSetShell(dsTopScoresThisWeek);
var dsMyTopScore = new Spry.Data.XMLDataSet("/cnservice/cartoonsvc/views/data/cnleaderboard.jsp?type=global&timeframe=all_time&gameid=cn_moldrush6", "board/entry", {useCache: false });
function eatCookie (region, lookupFunc) {
	var foo = lookupFunc('{@user}');
	var goo = readCookie('dname');
}
var myFilterFunc = function(dataSet, row, rowNumber)
{
	var cookieValue = '\\b\\'+readCookie("dname")+'\\b';
	var userToMatch = new RegExp(cookieValue, 'gi');
	if (row["@user"].search(userToMatch) != -1)
		return row; // Return the row to keep it in the data set.
	else {
		return "";
	}
}
dsMyTopScore.filter(myFilterFunc); // Filter the rows in the data set.
//////////////////////



// THIS GAME'S PROPERTY INFORMATION /////////////////////
// ds Property and dsBG need to have the property's content ID changed to match this property's ID. ///
var dsProperty = new Spry.Data.XMLDataSet("/cnservice/cartoonsvc/content/xml/getContentById.do?contentId=43690&depth=2", "Property");
var dsBg = new Spry.Data.XMLDataSet("/cnservice/cartoonsvc/content/xml/getContentById.do?contentId=43690&depth=2", "Property/backGroundImage_game");
//////////////////////



// FORUMS //////////////////////
// dsForums and dsForumSubject need to have the service call value match what is in the CMA field that is called Forum_URL. ///
var dsForums = new Spry.Data.XMLDataSet("/cnservice/cartoonsvc/views/data/forum.jsp?webtag=tcnben10af&fmt=xml&type=talkback&tid=6&count=10", "ContentElement/Forum/Folder/Discussion/Message[position() >= 0 and position() < 11]",{useCache:false,loadInterval:500000});
var dsForumPosts = new Spry.Data.NestedXMLDataSet(dsForums , "ContentElement/Forum/Folder/Discussion/Message[position() >= 0 and position() < 11]",{useCache:false,loadInterval:500000});
var dsForumSubject = new Spry.Data.XMLDataSet("/cnservice/cartoonsvc/views/data/forum.jsp?webtag=tcnben10af&fmt=xml&type=talkback&tid=6&count=10", "ContentElement/Forum/Folder/Discussion",{useCache:false});
var dsForumSubjectNest = new Spry.Data.NestedXMLDataSet(dsForumSubject, "ContentElement/Forum/Folder/Discussion",{useCache:false});
//////////////////////



// RELATED GAMES AND GAMES ASSOCIATED WITH THIS PROPERTY ///////////////////////
// dsPropertyGames needs to have the number of the content ID changed to the number of the content ID for the property associated with this game. ///
// dsRelatedGameCards needs to have the game genre edited to match this property's game genre (Arcade, Action, etc...). ///
var dsPropertyGames = new Spry.Data.XMLDataSet("/cnservice/cartoonsvc/content/xml/getContentById.do?contentId=43690&depth=2", "Property/Game", {sortOnLoad:"Game_Priority_ID",sortOrderOnLoad:"descending"});
var dsGameCards = new Spry.Data.NestedXMLDataSet(dsPropertyGames, "game_100x75_image", "Page_URL");
var dsGameOverlays = new Spry.Data.NestedXMLDataSet(dsPropertyGames, "overlay");
var dsRelatedGames = new Spry.Data.XMLDataSet("/cnservice/cartoonsvc/content/xml/getContentsByContentType.do?contentTypeName=Game&attribName=game_genre.title&attribValues=Action%20Games&max=5&filterContentId=43863&sortBy=Game_Priority_ID:desc&ignoreChildOfPropertyId=43690", "Contents/Game");
var dsRelatedGameCards = new Spry.Data.NestedXMLDataSet(dsRelatedGames, "game_100x75_image", "Page_URL");
var dsRelatedGameOverlays = new Spry.Data.NestedXMLDataSet(dsRelatedGames, "overlay");
//var filterRelatedGames = function(dataSet, row, rowNumber)
//{
//	if (row["Page_URL"].search(/^batmanbb/) != -1)
//		return null; // Return the row to keep it in the data set.
//	else {
//		return row;
//	}
//}
//dsRelatedGames.filter(filterRelatedGames); // Filter the rows in the data set.
//////////////////////



// MOST VIEWED AND TOP RATED CONTENT //////////////////////
// These will generally stay the same and not need editing. ///
var dsWhatOthers = new Spry.Data.XMLDataSet("/cnservice/cartoonsvc/content/xml/getContentsByContentType.do?contentTypeName=Game&depth=5&max=10&sortBy=timesplayed_now:desc&filterContentId=43863", "Contents/Game");
var dsWhatOthersItems = new Spry.Data.NestedXMLDataSet(dsWhatOthers, "Title", "Page_URL");
var dsTopTenRatedVideos = new Spry.Data.XMLDataSet("/cnvideosvc2/svc/episodeSearch/getAllEpisodes?networkName=CN2&limit=10&offset=0&sortByEpisodeRanking=DESC", "episodes/episode", { entityEncodeStrings: false });
var dsTopTenVideos = new Spry.Data.XMLDataSet("/cnvideosvc2/svc/episodeSearch/getAllEpisodes?networkName=CN2&limit=10&offset=0&sortByVideoRequest=DESC", "episodes/episode", { entityEncodeStrings: false });
var dsTopTenGames = new Spry.Data.XMLDataSet("/cnservice/cartoonsvc/content/xml/getContentsByContentType.do?contentTypeName=Game&depth=5&max=10&sortBy=rating:desc&filterContentId=43863", "Contents/Game");
var dsTopTenGameItems = new Spry.Data.NestedXMLDataSet(dsTopTenGames, "Title", "Page_URL");
//////////////////////



// HOVERS ////////////////////////
// These will generally stay the same and not need editing. ///
var topGamesSet = new Spry.Data.XMLDataSet("/cnservice/cartoonsvc/content/xml/getContentsByContentType.do?contentTypeName=Game&depth=5&max=6&sortBy=rating:desc&filterContentId=43863", "Contents/Game",{subPaths:["game_100x75_image/srcUrl"]});
var topGamesImgNest = new Spry.Data.NestedXMLDataSet(topGamesSet, "game_100x75_image");
var allGenresSet = new Spry.Data.XMLDataSet("/cnservice/cartoonsvc/content/xml/getContentById.do?contentId=43761&depth=5", "Featured_Games_Area/genres");
var nestedGenreGamesSet = new Spry.Data.NestedXMLDataSet(allGenresSet, "games");
var nestedGenreImgSet = new Spry.Data.NestedXMLDataSet(nestedGenreGamesSet, "game_100x75_image");
var hoverCardsSet = new Spry.Data.XMLDataSet("/tools/includes/cmagen/all_games.xml", "Contents/Game", {subPaths:["overlay/srcUrl","game_100x75_image/srcUrl"]});
var hoverVidSetRating = new Spry.Data.XMLDataSet("/cnvideosvc2/svc/episodeSearch/getAllEpisodes?networkName=CN2&limit=10&offset=0&sortByEpisodeRanking=DESC", "episodes/episode", { entityEncodeStrings: false });
var hoverVidSet = new Spry.Data.XMLDataSet("/cnvideosvc2/svc/episodeSearch/getAllEpisodes?networkName=CN2&limit=10&offset=0&sortByVideoRequest=DESC", "episodes/episode", { entityEncodeStrings: false });
//////////////////////