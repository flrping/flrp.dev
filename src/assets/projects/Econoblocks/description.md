# Econoblocks

## Overview

Econoblocks is a Minecraft plugin that adds a rewarding experience for players by providing incentives for breaking blocks. It includes customizable loot tables, multipliers, and dupe protection to ensure fair gameplay. The plugin is designed for seamless integration with other server plugins and offers extensive customization options to suit any server's needs.

## Features

### Dupe Protection

Econoblocks employs robust dupe protection mechanisms to prevent exploitation. The plugin tracks placed, moved, and transformed blocks, ensuring that rewards are legitimate.

### Loot Tables

Define diverse loot tables with five unique reward types:

- **Economy**: Reward players with in-game currency.
- **Item**: Provide specific items as loot.
- **Custom Item**: Integrate custom items from third-party plugins.
- **Potion**: Apply potion effects as rewards.
- **Command**: Execute server commands as part of the reward.

Loot tables can be enhanced with conditionals based on world, biome, permissions, and more.

### Multipliers

Boost rewards with flexible multiplier types that can be assigned to players:

- **Block**: Increase rewards for specific block types.
- **Tool**: Apply multipliers based on the tool used to mine blocks.
- **World**: Adjust rewards based on the world where the block was mined.

### Groups

Organize players or ranks into groups with unique multiplier configurations to offer tailored gameplay experiences.

### Drop Rates

Customize loot distribution by assigning weighted drop rates for each block type, ensuring balanced and varied rewards.

### Blacklist

Exclude specific worlds from generating rewards to maintain gameplay balance or align with server rules.

### Plugin Compatibility

Econoblocks integrates with popular third-party plugins, including:

- ItemsAdder
- Oraxen
- MMOItems
- TokenManager
- PlayerPoints
- DecentHolograms
- PlaceholderAPI

### Customization

Fully customizable messages and placeholders allow server administrators to create a personalized experience that aligns with their server's theme and branding.

## Commands

Econoblocks offers intuitive commands for both players and administrators:

### Default Commands

- `/econoblocks`: Displays a help guide.
- `/econoblocks toggle`: Toggles income messages.

### Admin Commands

- `/econoblocks profile <user>`: Views a player's multiplier and profile details.
- `/econoblocks check <block/custom> <context>`: Displays loot profiles for specific blocks.
- `/econoblocks multiplier add <user> <block/tool/world/custom_block/custom_tool> <context> <multiplier>`: Adds a multiplier for a user.
- `/econoblocks multiplier remove <user> <block/tool/world/custom_block/custom_tool> <context>`: Removes a multiplier for a user.
- `/econoblocks reload`: Reloads the plugin configuration.

## Permissions

Econoblocks permissions allow fine-grained control over feature access:

- `econoblocks.toggle`: Grants access to the toggle command (default).
- `econoblocks.profile`: Grants access to the profile command.
- `econoblocks.check`: Grants access to the check command.
- `econoblocks.multiplier`: Grants access to multiplier commands.
- `econoblocks.reload`: Grants access to the reload command.
- `econoblocks.admin`: Provides full administrative permissions.
- `econoblocks.group.<group>`: Assigns a multiplier group to a user.
