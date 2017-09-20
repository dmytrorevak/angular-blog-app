blogApp.controller('blogCtrl', function ($http) {

    // save the $scope as vm
    var vm = this;

    // get initial posts list from posts.json
    $http.get("./posts.json").then(function(response) {
        vm.postList = response.data;
    });

    // show the verification when user load the page
    vm.isPasswordModalVisible = true;

    // verify is user admin when he click enter button
    vm.adminVerification = function () {
        if (vm.login === 'log' && vm.password === 'pas') {
            vm.userStatus  = 'Admin';
            vm.passwordWarning = '';
            vm.isPasswordModalVisible = !vm.isPasswordModalVisible;
        } else {
            vm.passwordWarning = 'Incorrect login or password';
        }
    };

    // allow system access like guest if user click continue
    vm.continueLikeGuest = function () {
        vm.userStatus  = 'Guest';
        vm.isPasswordModalVisible = !vm.isPasswordModalVisible;
    };

    // add new blog post when user click add button
    vm.addNewPost = function () {
        if (vm.newPostTopic && vm.newPostMessage) {
            var newPost = {};
            newPost.postHeading = vm.newPostTopic;
            newPost.author = vm.userStatus;
            newPost.date = vm.getCurrentDate();
            newPost.message = vm.newPostMessage;
            vm.postList.push(newPost);
        }
    };

    // remove certain post when user click remove button
    vm.removePost =  function (post) {
        var postIndex = vm.postList.indexOf(post);
        vm.postList.splice(postIndex, 1);
    };

    // function which generated current date for the new post on blog
    vm.getCurrentDate = function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        if(dd < 10) {
            dd = '0' + dd;
        }

        if(mm < 10) {
            mm = '0' + mm;
        }

        return mm + '/' + dd + '/' +yyyy;
    };

    // hide the changing modal window by default
    vm.isEditingModalVisible = false;

    // change post when user click the change button
    vm.changePost = function (post) {

        // show changing modal
        vm.isEditingModalVisible = true;

        // save post object which user editing
        vm.changingPost = post;
        vm.changingTopic = post.postHeading;
        vm.changingMessage = post.message;
    };

    // save user's changes
    vm.saveChanges = function () {
        vm.changingPost.postHeading = vm.changingTopic;
        vm.changingPost.message = vm.changingMessage;

        // hide changing modal
        vm.isEditingModalVisible = false;
    };
});