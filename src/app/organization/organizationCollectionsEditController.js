﻿angular
    .module('bit.organization')

    .controller('organizationCollectionsEditController', function ($scope, $state, $uibModalInstance, apiService, cipherService,
        $analytics, id, authService) {
        $analytics.eventTrack('organizationCollectionsEditController', { category: 'Modal' });
        $scope.collection = {};
        $scope.groups = [];
        $scope.selectedGroups = {};
        $scope.loading = true;
        $scope.useGroups = false;

        $uibModalInstance.opened.then(function () {
            return apiService.collections.getDetails({ orgId: $state.params.orgId, id: id }).$promise;
        }).then(function (collection) {
            $scope.collection = cipherService.decryptCollection(collection);

            var groups = {};
            if (collection.GroupIds) {
                for (var i = 0; i < collection.GroupIds.length; i++) {
                    groups[collection.GroupIds[i]] = true;
                }
            }
            $scope.selectedGroups = groups;

            return authService.getUserProfile();
        }).then(function (profile) {
            if (profile.organizations) {
                var org = profile.organizations[$state.params.orgId];
                $scope.useGroups = !!org.useGroups;
            }

            if ($scope.useGroups) {
                return apiService.groups.listOrganization({ orgId: $state.params.orgId }).$promise;
            }

            return null;
        }).then(function (groups) {
            if (!groups) {
                $scope.loading = false;
                return;
            }

            var groupsArr = [];
            for (var i = 0; i < groups.Data.length; i++) {
                groupsArr.push({
                    id: groups.Data[i].Id,
                    name: groups.Data[i].Name,
                    accessAll: groups.Data[i].AccessAll
                });
            }

            $scope.groups = groupsArr;
            $scope.loading = false;
        });

        $scope.toggleGroupSelectionAll = function ($event) {
            var groups = {};
            if ($event.target.checked) {
                for (var i = 0; i < $scope.groups.length; i++) {
                    groups[$scope.groups[i].id] = true;
                }
            }

            $scope.selectedGroups = groups;
        };

        $scope.toggleGroupSelection = function (id) {
            if (id in $scope.selectedGroups) {
                delete $scope.selectedGroups[id];
            }
            else {
                $scope.selectedGroups[id] = true;
            }
        };

        $scope.groupSelected = function (group) {
            return group.id in $scope.selectedGroups || group.accessAll;
        };

        $scope.allSelected = function () {
            return Object.keys($scope.selectedGroups).length === $scope.groups.length;
        };

        $scope.submit = function (model) {
            var collection = cipherService.encryptCollection(model, $state.params.orgId);

            if ($scope.useGroups) {
                collection.groupIds = [];

                for (var groupId in $scope.selectedGroups) {
                    if ($scope.selectedGroups.hasOwnProperty(groupId)) {
                        collection.groupIds.push(groupId);
                    }
                }
            }

            $scope.submitPromise = apiService.collections.put({
                orgId: $state.params.orgId,
                id: id
            }, collection, function (response) {
                $analytics.eventTrack('Edited Collection');
                var decCollection = cipherService.decryptCollection(response, $state.params.orgId, true);
                $uibModalInstance.close(decCollection);
            }).$promise;
        };

        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
