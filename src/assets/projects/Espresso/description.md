# Espresso

## Overview

Espresso is a lightweight and versatile Java library tailored for Minecraft plugin development. Designed to streamline your workflow, Espresso provides a robust set of tools, utilities, and hooks for building highly customizable plugins with ease. While originally developed for personal projects, this library is open for everyone to use and integrate into their Minecraft projects.

## Installation

To include Espresso in your project, add the following to your `pom.xml` file:

```xml
<repositories>
    <repository>
        <id>jitpack.io</id>
        <url>https://jitpack.io</url>
    </repository>
</repositories>

<dependencies>
    <dependency>
        <groupId>com.github.flrping</groupId>
        <artifactId>Espresso</artifactId>
        <version>Tag</version>
    </dependency>
</dependencies>
```

Replace `Tag` with the desired version of Espresso.

## Key Features

### Loot Table System

Effortlessly build and manage loot tables with Espresso’s comprehensive loot classes. These enable the creation of dynamic rewards tailored to your plugin’s requirements.

### Conditionals

Link your loot tables or other game mechanics to conditionals for greater flexibility. Define behaviors based on world, biome, permissions, or custom triggers.

### Plugin Integrations

Seamlessly integrate with popular plugins using built-in providers, making it easy to support additional features like economy systems or custom items.

### Configuration Management

Simplify plugin setup with intuitive configuration classes that streamline the creation and maintenance of configuration files.

### Message Builder

Efficiently distribute messages to players or locations with Espresso’s customizable message builder, complete with placeholder support.

### Utility Classes

Access a wide array of utility functions to handle common development tasks, saving time and reducing boilerplate code.

## Plugin Hook Examples

Espresso’s hook system allows you to create flexible, plugin-agnostic integrations. Providers ensure compatibility with multiple plugins, enabling users to choose their preferred solutions.

### Economy Integration Example

```java
public class HookManager {

    private EconomyProvider economyProvider;

    public EconomyProvider getEconomyProvider() {
        return economyProvider;
    }

    public void setEconomyProvider() {
        String economySetting = plugin.getConfig().getString("economy-type");
        EconomyType economyType = EconomyType.getByName(economySetting);
        switch (economyType) {
            case VAULT:
                economyProvider = new VaultProvider();
                break;
            case PLAYER_POINTS:
                economyProvider = new PlayerPointsProvider();
                break;
            case TOKEN_MANAGER:
                economyProvider = new TokenManagerProvider();
                break;
            default:
                // Handle fallback logic here
        }
    }
}
```

### Event Usage Example

```java
public class MoneyOnJoin {

    private final Plugin plugin;

    public MoneyOnJoin(Plugin plugin) {
        this.plugin = plugin;
    }

    @EventHandler
    public void onJoinEvent(PlayerJoinEvent event) {
        Player player = event.getPlayer();

        // Some plugins need to have an account created before you can deposit.
        // It may throw an exception the player does not have an account.
        if(!plugin.getHookManager().getEconomyProvider().hasAccount(player)) 
            plugin.getHookManager().getEconomyProvider().createAccount(player);
        
        // Deposit 1000 to the player.
        // Done!
        plugin.getHookManager().getEconomyProvider().deposit(player, 1000);
    }
}
```

## Supported Plugins and Hooks

Espresso supports the following plugins for seamless integration:

### Economies

- Vault
- PlayerPoints
- TokenManager [3.2.8+]

### Entities

- MythicMobs
- InfernalMobs
- LevelledMobs
- ItemsAdder

### Holograms

- DecentHolograms

### Items

- ItemsAdder
- Oraxen
- MMOItems

### Blocks

- ItemsAdder
- Oraxen

### Spawners

- EpicSpawners
- UltimateStacker [3.0.0+]
- RoseStacker
- WildStacker
- UpgradeableSpawners

### Stackers

- WildStacker
- StackMob 5
- UltimateStacker [3.0.0+]
- RoseStacker
