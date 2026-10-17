"use strict";

const gladiator = {
    name: "Marcus",
    hp: 100,
    attack: 15,
    defense: 8,
    kills: 12,
    gold: 850
};

const leaderboardGladiators = [
    { name: "Maximus", kills: 58, status: "Alive" },
    { name: "Aurelius", kills: 53, status: "Alive" },
    { name: "Cassius", kills: 47, status: "Alive" },
    { name: "Brutus", kills: 43, status: "Dead" },
    { name: "Titus", kills: 39, status: "Alive" },
    { name: "Spartacus", kills: 35, status: "Dead" },
    { name: "Lucius", kills: 31, status: "Alive" },
    { name: "Decimus", kills: 26, status: "Alive" },
    { name: "Gaius", kills: 22, status: "Dead" },
    { name: "Flavius", kills: 18, status: "Alive" },
    { name: "Marcus", kills: 12, status: "Alive", isPlayer: true }
];

let currentGold = 850;

function updateText(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}

function updateGladiatorHub() {
    if (!document.getElementById("gladiator-summary")) {
        return;
    }

    updateText("gladiator-name", gladiator.name);
    updateText("gladiator-hp", `${gladiator.hp} / ${gladiator.hp}`);
    updateText("gladiator-kills", gladiator.kills);
    updateText("player-gold", gladiator.gold);
    updateText("gladiator-attack", gladiator.attack);
    updateText("gladiator-defense", gladiator.defense);
}

function setupCreateGladiatorForm() {
    const $form = $("#gladiator-form");

    if (!$form.length) {
        return;
    }

    $form.on("submit", function (event) {
        event.preventDefault();

        const name = $("#gladiator-name").val().trim();
        const style = $("input[name='fighting-style']:checked").val();
        const $error = $("#name-error");

        if (!name) {
            $error.text("Please enter a gladiator name.").removeClass("hidden");
            $("#gladiator-preview").addClass("hidden");
            $("#gladiator-name").trigger("focus");
            return;
        }

        $error.text("").addClass("hidden");
        $("#preview-name").text(name);
        $("#preview-style").text(style.charAt(0).toUpperCase() + style.slice(1));
        $("#gladiator-preview").removeClass("hidden");
    });
}

function setupArena() {
    const attackButton = document.getElementById("attack-button");

    if (!attackButton) {
        return;
    }

    const player = {
        name: "Marcus",
        hp: 82,
        maxHp: 100,
        attack: 18,
        defense: 14,
        accuracy: 78,
        evasion: 12
    };
    const enemy = {
        name: "Cassian",
        hp: 61,
        maxHp: 90,
        attack: 16,
        defense: 12,
        accuracy: 74,
        evasion: 15
    };
    const battleLog = document.getElementById("battle-log");
    const currentTurn = document.getElementById("current-turn");
    const roundNumber = document.getElementById("round-number");
    const battleResult = document.getElementById("battle-result");
    let round = 1;
    let battleOver = false;

    function addBattleLog(message) {
        const item = document.createElement("li");
        item.textContent = message;
        battleLog.appendChild(item);
    }

    function updateBattleDisplay() {
        updateText("player-hp", `${player.hp} / ${player.maxHp}`);
        updateText("enemy-hp", `${enemy.hp} / ${enemy.maxHp}`);
        roundNumber.textContent = round;
    }

    function performAttack(attacker, defender) {
        const hitChance = Math.max(5, Math.min(95, attacker.accuracy - defender.evasion));

        if (Math.random() * 100 >= hitChance) {
            addBattleLog(`${attacker.name} misses ${defender.name}.`);
            return;
        }

        const damage = Math.max(1, attacker.attack - Math.floor(defender.defense / 2));
        defender.hp = Math.max(0, defender.hp - damage);
        addBattleLog(`${attacker.name} hits ${defender.name} for ${damage} damage.`);
    }

    function finishBattle(message) {
        battleOver = true;
        attackButton.disabled = true;
        attackButton.classList.add("cursor-not-allowed", "opacity-50");
        battleResult.textContent = message;
        battleResult.classList.remove("hidden");
        currentTurn.textContent = message.startsWith("Victory") ? "Victory" : "Defeat";
        addBattleLog(message);
    }

    battleLog.innerHTML = "";
    addBattleLog("Battle begins. Marcus attacks first.");
    updateBattleDisplay();

    attackButton.addEventListener("click", function () {
        if (battleOver) {
            return;
        }

        currentTurn.textContent = "Player";
        performAttack(player, enemy);
        updateBattleDisplay();

        if (enemy.hp === 0) {
            finishBattle("Victory! Cassian has been defeated.");
            return;
        }

        currentTurn.textContent = "Enemy";
        performAttack(enemy, player);
        updateBattleDisplay();

        if (player.hp === 0) {
            finishBattle("Defeat! Marcus has fallen.");
            return;
        }

        round += 1;
        currentTurn.textContent = "Player";
        updateBattleDisplay();
    });
}

function renderLeaderboard() {
    const tableBody = document.getElementById("leaderboard-body");

    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = "";
    const sortedGladiators = [...leaderboardGladiators].sort((a, b) => b.kills - a.kills);

    sortedGladiators.forEach(function (entry, index) {
        const row = document.createElement("tr");
        const isDead = entry.status === "Dead";
        const rowClass = entry.isPlayer
            ? "player-row bg-amber-200 font-bold ring-3 ring-inset ring-amber-600"
            : isDead
                ? "dead-row bg-stone-400 text-stone-700"
                : index % 2 === 0
                    ? "hover:bg-amber-100"
                    : "bg-amber-100/80 hover:bg-amber-100";
        const statusClass = isDead
            ? "bg-stone-700 text-stone-100"
            : "bg-emerald-800 text-emerald-100";
        const nameClass = isDead ? "line-through" : "";
        const playerLabel = entry.isPlayer
            ? ' <span class="block text-xs uppercase tracking-wide text-red-950 sm:inline">(Your Gladiator)</span>'
            : "";

        row.className = rowClass;
        row.innerHTML = `
            <td class="px-4 py-3 text-center font-bold">${index + 1}</td>
            <th class="px-4 py-3 text-left ${nameClass}" scope="row">${entry.name}${playerLabel}</th>
            <td class="px-4 py-3 text-center font-bold">${entry.kills}</td>
            <td class="px-4 py-3 text-center">
                <span class="rounded-full px-3 py-1 text-xs font-bold ${statusClass}">${entry.status}</span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function setupLeaderboardToggle() {
    const $button = $("#toggle-dead-button");
    let deadRowsHidden = false;

    if (!$button.length) {
        return;
    }

    $button.on("click", function () {
        deadRowsHidden = !deadRowsHidden;

        if (deadRowsHidden) {
            $(".dead-row").hide();
            $button.text("Show Dead Gladiators");
        } else {
            $(".dead-row").show();
            $button.text("Hide Dead Gladiators");
        }
    });
}

function buyItem(itemName, price) {
    if (currentGold < price) {
        alert(`Not enough gold to buy ${itemName}.`);
        return;
    }

    if (!confirm(`Buy ${itemName} for ${price} Gold?`)) {
        return;
    }

    currentGold -= price;
    updateText("player-gold", currentGold);
    alert(`${itemName} purchased successfully.`);
}

function setupShop() {
    if (!document.querySelector(".buy-button")) {
        return;
    }

    document.querySelectorAll(".buy-button").forEach(function (button) {
        button.addEventListener("click", function () {
            buyItem(button.dataset.item, Number(button.dataset.price));
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    updateGladiatorHub();
    setupCreateGladiatorForm();
    setupArena();
    renderLeaderboard();
    setupLeaderboardToggle();
    setupShop();
});
