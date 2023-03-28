// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract BlockTubeAds {
    struct Manager {
        uint256 id;
        string companyName;
        string profileImage;
        address walletId;
    }

    struct Video {
        address owner;
        uint256 id;
        string title;
        uint256 bidAmount;
        string websiteLink;
        string videoUrl;
        string description;
        string category;
        bool isDeleted;
    }

    address BlockTubeOwner = 0xD579f98C47D4139EA8FCC0A5Ad71fc7c4604d17e;

    mapping(uint256 => Manager) public managers;
    mapping(uint256 => Video) public videos;

    uint256 public numberOfManagers = 0;
    uint256 public numberOfVideos = 0;

    function getManagerProfile(
        address _address
    ) public view returns (Manager memory) {
        Manager memory ManagerDetails;

        for (uint256 i = 0; i < numberOfManagers; i++) {
            if (managers[i].walletId == _address) {
                ManagerDetails = managers[i];
                break;
            }
        }

        return ManagerDetails;
    }

    function getAllManager() external view returns (Manager[] memory) {
        Manager[] memory allManager = new Manager[](numberOfManagers);

        for (uint256 i = 0; i < numberOfManagers; i++) {
            allManager[i] = managers[i];
        }

        return allManager;
    }

    function uploadVideo(
        string memory title,
        string memory websiteLink,
        string memory videoUrl,
        string memory description,
        string memory category
    ) public {
        Video storage video = videos[numberOfVideos];

        video.owner = msg.sender;
        video.id = numberOfVideos;
        video.title = title;
        video.bidAmount = 0;
        video.websiteLink = websiteLink;
        video.videoUrl = videoUrl;
        video.description = description;
        video.category = category;
        video.isDeleted = false;

        numberOfVideos++;
    }

    function createManager(
        string memory companyName,
        string memory profileImage
    ) external {
        Manager storage manager = managers[numberOfManagers];

        manager.id = numberOfManagers;
        manager.companyName = companyName;
        manager.profileImage = profileImage;
        manager.walletId = msg.sender;

        numberOfManagers++;
    }

    function bidAd(uint256 _id) public payable {
        Video storage video = videos[_id];

        uint256 amount = msg.value;

        (bool sent, ) = payable(BlockTubeOwner).call{value: amount}("");

        if (sent) {
            video.bidAmount += amount;
        }
    }
}
