// USE NOTEPAD++ FOR BETTER EDITOR https://github.com/notepad-plus-plus/notepad-plus-plus/releases/download/v8.6.4/npp.8.6.4.Installer.x64.exe
// Portal settings ////////////////////////////////////////////////////////
var portal_key = 'PJR6J-SF7RT-XUPZR-4KWCS-LYITUNWN-AF0JK';
var hotspot_name = 'SHEHANI PISO WIFI';
var login_option = 0; // 0 for voucher only, 1 for voucher with password (for mikhmon users)
var currency_symbol = '₱';
var mac_as_voucher = false;
var hide_voucher_details = false;
var noPausePrefix = ['TR', 'PR', 'MR', 'CR', 'T-', 'RD']; // No pause voucher that started with this prefix
var noExtendPrefix = ['TR', 'PR', 'MR', 'CR', 'T-', 'RD']; // No extend voucher that started with this prefix
var portal_adminpage_username = 'admin';
var portal_adminpage_password = 'admin';
var enable_captive_portal_bypass = false;

// Misc settings //////////////////////////////////////////////////////////
var footer_text =
  'All rights reserved ' + new Date().getFullYear() + '<br> Contact Facebook: Haider Abo';
var announcement = false;
var announcement_duration = 5; //10s
var announcement_text =
  'ADDED FEATURES<br>� Loyalty points <br><a style="color:#fff" href="/loyalty.html" title="my Points">Sign up here</a><br><br>CHANGES: New Interface<br>� E-loading<br>� Manual vendo selection<br><br>OTHERS<br>� Movie search function<br>� Watch anime';

// Portal buttons settings ////////////////////////////////////////////////
var hide_insertcoin_button = false;
var hide_wifirates_button = false;
var hide_movies_button = false;
var hide_iptv_button = false;
var hide_eload_button = true;
var hide_vault_button = true;
var hide_charging_button = true; // not yet implemented
var hide_loyal_button = true;
var hide_pause_button = false;
var hide_member_login = true;
var pause_limit = 0; // pause available per voucher, 0 = unli pause

// Loyal points system settings ///////////////////////////////////////////
var loyal_points_Database = 'JuanFi'; //public database, if you want your own database. pm me
var points_per_piso = 0.2; // 1 peso = 0.2pts
var remote_api_ip = '00.0.0.0:0000'; // port:8728 same as juanfi manager remote ip. purchase to vexifi, hostddns, remotewinbox
const redeemTime = [
  {
    Label: '5 points',
    Time: '30m',
    Points: '5',
    Validity: '5m',
  },
  {
    Label: '10 points',
    Time: '1h',
    Points: '10',
    Validity: '60m',
  },
  {
    Label: '20 points',
    Time: '3h',
    Points: '20',
    Validity: '120m',
  },
  {
    Label: '30 points',
    Time: '5h',
    Points: '30',
    Validity: '300m',
  },
  {
    Label: '50 points',
    Time: '1d',
    Points: '50',
    Validity: '1440m',
  },
];

// GCash setting //////////////////////////////////////////////////////////
// Follow this guide to activate GCash: https://payments.wifree.network/tutorial/ewallet-voucher-purchase/
var hide_gcash_button = true;
var gcash_url =
  'https://payments.wifree.network/xendit/production/purchase_voucher.php';
var gcash_key = 'xxxxxxxxxxx'; // portal key from wifree telegram bot

// Telegram coindrop notification /////////////////////////////////////////
var enable_coin_drop = true;
var BotToken = '7236687516:AAF8IeFjfVyFwrM3yjtM1-PmXseWKUNPR_A';
var ChatId = '-7473789534';

// Vendo Setting //////////////////////////////////////////////////////////
// If single vendo
var VendoIpAddress = '10.0.0.14';
// If multi vendo
var multi_vendo = false;
var multi_vendo_type = '0'; // 0 = manual, 1 = auto via Hotspot Address, 2 = auto via Interface Name
var multi_vendo_ip = [
  {
    vendo_name: 'Vendo 1', // vendo name
    vendo_ip: '10.0.101.251', // vendo ip
    hotspot_address: '10.0.0.1', // hotspot address
    vlan_id: 'vlan101', //interface name
  },
  {
    vendo_name: 'Vendo 2', // vendo name
    vendo_ip: '10.0.102.254', // vendo ip
    hotspot_address: '10.0.102.1', // hotspot address
    vlan_id: 'vlan102', //interface name
  },
  {
    vendo_name: 'Vendo 3', // vendo name
    vendo_ip: '10.0.103.254', // vendo ip
    hotspot_address: '10.0.103.1', // hotspot address
    vlan_id: 'vlan103', //interface name
  },
  {
    vendo_name: 'Vendo 4', // vendo name
    vendo_ip: '10.0.104.254', // vendo ip
    hotspot_address: '10.0.104.1', // hotspot address
    vlan_id: 'vlan104', //interface name
  },
  {
    vendo_name: 'Vendo 5', // vendo name
    vendo_ip: '10.0.105.254', // vendo ip
    hotspot_address: '10.0.105.1', // hotspot address
    vlan_id: 'vlan105', //interface name
  },
  {
    vendo_name: 'Vendo 6', // vendo name
    vendo_ip: '10.0.106.251', // vendo ip
    hotspot_address: '10.0.106.1', // hotspot address
    vlan_id: 'vlan106', //interface name
  },
  {
    vendo_name: 'Vendo 7', // vendo name
    vendo_ip: '10.0.107.254', // vendo ip
    hotspot_address: '10.0.107.1', // hotspot address
    vlan_id: 'vlan107', //interface name
  },
  {
    vendo_name: 'Vendo 8', // vendo name
    vendo_ip: '10.0.108.254', // vendo ip
    hotspot_address: '10.0.108.1', // hotspot address
    vlan_id: 'vlan108', //interface name
  },
  {
    vendo_name: 'Vendo 9', // vendo name
    vendo_ip: '10.0.109.254', // vendo ip
    hotspot_address: '10.0.109.1', // hotspot address
    vlan_id: 'vlan109', //interface name
  },
  {
    vendo_name: 'Vendo 10', // vendo name
    vendo_ip: '10.0.110.254', // vendo ip
    hotspot_address: '10.0.110.1', // hotspot address
    vlan_id: 'vlan110', //interface name
  }
  // palaging walang "," kuwit or comma sa dulong bracket "}" ang huling vendo setting
];
