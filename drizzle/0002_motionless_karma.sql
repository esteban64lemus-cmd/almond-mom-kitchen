CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('recipe_published','draft_approved','draft_rejected','recipe_submitted','error','info') NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text,
	`relatedRecipeId` int,
	`relatedDraftId` int,
	`read` int NOT NULL DEFAULT 0,
	`actionUrl` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
