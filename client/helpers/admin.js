// import { RunningGames } from '../../lib/collections';
// import { AllStocks } from '../../lib/collections';

Template.adminDash.helpers({
	"click .skipYear": function (event) {
		Meteor.call("incrementGameYear", RunningGames.findOne({$and: [{"gameCode": Session.get("GameCode")}, {"group": "admin"}]})._id, "AdminSkip");
	}
});

Template.userKicks.helpers({
	allUsers: function () {
		return RunningGames.find({$and: [{gameCode: Session.get("GameCode")}, {player: {$ne: Meteor.userId()}}]});
	},

});

Template.userKicks.events({
	"submit .kickPlayer": function (event) {
		// console.log("trast");
		event.preventDefault();
		if (event.target.player.value != "None"){
			Meteor.call("kickPlayer", Session.get("GameCode"), event.target.player.value, function (err, result){
				if (err){
					console.log("player kicking failed :( ");
				}
				else {
					Meteor.call("raiseAlert", Meteor.userId(), {"text": "Player kicked!", "contextKind": "adminAction", "context": "thisUser"}, Session.get("GameCode"), "success");
				}
			});
		}
	},

	"click .kickAll": function (event) {
		Meteor.call("kickPlayer", Session.get("GameCode"), Meteor.userId(), true, function (err, result){
			if (err){
				console.log("player kicking failed :( ");
			}
			else {
				Meteor.call("raiseAlert", Meteor.userId(), {"text": "All players kicked!", "contextKind": "adminAction", "context": "thisUser"}, Session.get("GameCode"), "success");
			}
		});
	},

	"click .killGame": function (event) {
		Router.go('/');
		Meteor.call("kickPlayer", Session.get("GameCode"), "all", function (err, result){
			if (err){
				console.log("player kicking failed :( ");
				alert("Game ending failed!! Tell somebody, things are awry.")
			}
			else {
				// Meteor.call("raiseAlert", "All players kicked!");
				Router.go("/");
			}
		});

	}		
});

Template.stockEditor.helpers({
	groupStocks: function () {
		return AllStocks.find({gameCode: Session.get("GameCode")});
	},

});

Template.stockEditor.events({
		
});
