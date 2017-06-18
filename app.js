var PubnubChatApp = angular.module('PubNubAngularApp', ['pubnub.angular.service']);

PubnubChatApp.controller('HelloCtrl', ['$scope', 'Pubnub', function($scope, Pubnub) {
 Pubnub.init({
        publishKey : 'pub-c-48cd3d19-7291-448f-806f-b3f1cd3699cf',
        subscribeKey : 'sub-c-fa093b66-52a6-11e7-87c6-02ee2ddab7fe'
    });
	Pubnub.subscribe({
		channels: ['messages-channels']
	});	
		$scope.chatMessages = [];	
	   $scope.SendMessage = function(messaage){
		   Pubnub.publish(
			{
				message: messaage,
				channel: 'messages-channels'
			},
			function (status, response) {
			$scope.msg = null;
				if (status.error) {
					console.log(status)
				} else {

					console.log("message Published w/ timetoken", response.timetoken);
					
				}
			});
		}

Pubnub.addListener({
    status: function(statusEvent) {
        if (statusEvent.category === "PNUnknownCategory") {
            var newState = {
                new: 'error'
            };
            Pubnub.setState(
                { 
                    state: newState 
                }, 
                function (status) {
                    console.log(statusEvent.errorData.message)
                }
            );
        }
    },
    message: function(message) {
		
		$scope.chatMessages.unshift(message.message);
		$scope.$apply();
		console.log($scope.chatMessages);
    }
});
 


}]);

 