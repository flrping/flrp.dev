# Economobs

## Overview

Economobs is a Minecraft plugin designed to enhance gameplay by rewarding players for defeating various entities. By incorporating customizable loot tables, multipliers, and compatibility with popular third-party plugins, Economobs adds a layer of depth and engagement to any server experience. This plugin is fully customizable, allowing server administrators to tailor its features to their unique requirements.

## Features

### Loot Tables

Economobs provides robust loot table support with five distinct loot types:

- **Economy**: Reward players with in-game currency.
- **Item**: Drop specific items as loot.
- **Custom Item**: Integrate custom items from third-party plugins.
- **Potion**: Apply potion effects as rewards.
- **Command**: Execute commands as part of loot rewards.

Loot tables are further enhanced with conditionals, such as restrictions based on world, biome, or permissions.

### Multipliers

Boost player rewards using flexible multipliers, configurable based on different contexts:

- **Entity**: Increase rewards for specific entities.
- **Weapon**: Apply multipliers based on the tool or weapon used.
- **World**: Adjust rewards based on the world where the entity was defeated.

### Groups

Organize players or ranks into groups, each with unique multiplier configurations to differentiate their gameplay experience.

### Drop Rates

Fine-tune the frequency and distribution of loot drops using weighted drop rates for each entity.

### Blacklist

Exclude specific worlds from generating rewards to maintain balance or meet server rules.

### Plugin Compatibility

Economobs integrates seamlessly with various third-party plugins, including:

- WildStacker
- StackMob 5
- UltimateStacker
- RoseStacker
- TokenManager
- PlayerPoints
- ItemsAdder
- MMOItems
- Oraxen
- MythicMobs
- LevelledMobs
- InfernalMobs
- DecentHolograms
- PlaceholderAPI

### Customization

Economobs ensures a fully customizable experience with editable messages and a rich set of placeholders, empowering server administrators to create a truly personalized environment.

## Commands

Economobs offers a comprehensive set of commands for both players and administrators:

### Default Commands

- `/economobs`: Displays a help guide.
- `/economobs toggle`: Toggles income messages.

### Admin Commands

- `/economobs profile <user>`: Views a player's profile.
- `/economobs check <entity/custom> <context>`: Displays loot profiles for entities.
- `/economobs multiplier add <user> <entity/tool/world/custom_entity/custom_tool> <context> <multiplier>`: Adds a multiplier for a user.
- `/economobs multiplier remove <user> <entity/tool/world/custom_entity/custom_tool> <context>`: Removes a multiplier for a user.
- `/economobs reload`: Reloads the plugin configuration.

## Permissions

Economobs permissions allow precise control over command access and feature usage:

- `economobs.toggle`: Access the toggle command (default).
- `economobs.profile`: Access the profile command.
- `economobs.check`: Access the check command.
- `economobs.multiplier`: Access multiplier commands.
- `economobs.reload`: Access the reload command.
- `economobs.admin`: Grants admin-level permissions.
- `economobs.group.<group>`: Assigns a multiplier group to a user.
