
myApp.service('apiService', function($http, $q) {
//  Creates link using information from the scrape function
	this.createLinkfireLink = function (postData, data) {

		var d = $q.defer();

		$http({
			method: 'POST',
			url: live + '/1.0/links/create',
			headers: {'Content-type': 'application/json'},
			data: {
				"token": postData.token,
				"user_id": postData.user_id,
				"url": data.url,
				"description": data.description,
				"title": data.title,
				"video": postVideo,
				"thumbnail": postImage
			}
		}).success(function (data, status, headers) {
			d.resolve(data);
		}).error(function (data, status, headers) {
			if (status == 400) {
				console.log("Error: " + status + ". Missing or invalid parameters.");
			} else if (status == 401) {
				console.log("Error: " + status + ". User doesn’t have access to the link.");
			} else if (status == 403) {
				console.log("Error: " + status + ". Expired or invalid token.");
			} else if (status == 500) {
				console.log("Error: " + status + ". Internal error. Contact support@linkfire.com.");
			} else {
				console.log("Error: " + status);
			}
			d.reject(status);
		});
		return d.promise;
	};
});