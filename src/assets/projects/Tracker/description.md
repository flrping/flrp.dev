# Tracker

## Overview

Tracker is a versatile Minecraft plugin designed to enhance player engagement by tracking progress and rewarding achievements. Players can monitor blocks broken and entities killed while earning customizable rewards for reaching milestones. For additional control, Tracker supports modules to enable tracking on specific tools, making it a flexible solution for all types of servers.

## Features

### Tool-Based Tracking

Track the number of blocks broken or entities killed directly on your players' tools, offering personalized progress tracking.

### Persistent Progress

Progress remains tied to the tool, even after renaming, ensuring no data loss.

### Milestone Rewards

Celebrate player achievements with configurable rewards. Set objectives to trigger actions such as:

- Running server commands.
- Upgrading tool enchantments.

You can define rewards for specific milestones or recurring objectives.

### Tracker Modules

Enable modular tracking to add an extra layer of progression. Players must acquire and apply tracker modules to tools, allowing greater control over tracking availability.

### Whitelist Support

Maintain precision with a configurable whitelist to specify which blocks and entities contribute to tracking progress.

### Stacker Plugin Integration

Ensure accurate tracking with full support for stacker plugins:

- **WildStacker**: Fully counts stack numbers towards progress.
- **StackMob 5**: Fully counts stack numbers towards progress.

### Extensive Customization

Tailor the plugin’s messages and functionality to match your server’s unique style and branding.

## Commands

Tracker offers intuitive commands for both players and administrators:

### Default Commands

- `/tracker`: Displays an in-game help guide.

### Basic Commands

- `/tracker progress`: Displays the current milestone progress for the held tool.
- `/tracker milestones`: Lists all milestones for the held tool.

### Admin Commands

- `/tracker give <player>`: Grants a tracker module to a player.
- `/tracker reload`: Reloads the plugin configuration.

## Permissions

Control access to features with the following permissions:

- `tracker.progress`: Allows access to the progress command.
- `tracker.milestones`: Allows access to the milestones command.
- `tracker.admin`: Grants access to all admin commands.
