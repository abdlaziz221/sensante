# Plan IA — SénSanté

Souleymane Sirima Mbodj 
29  Avril 2026

1. Compte Groq créé

Plateforme : https://console.groq.com

2. Clé API obtenue

Nom de la clé : sensante-dev
Stockée localement (jamais commit sur Git)

3. Test de la clé avec curl
sur le powershellon tape la commande:
$env:GROQ_API_KEY = "gsk_xxxxxxxxxxxxxxxx"

ensuite on tape la commande:
echo $env:GROQ_API_KEY 
 on obitent la clé 

on tape la commande:
curl.exe -X POST "https://api.groq.com/openai/v1/chat/completions" `
  -H "Authorization: Bearer $env:GROQ_API_KEY" `
  -H "Content-Type: application/json" `
  -d '{\"model\": \"llama-3.3-70b-versatile\", \"messages\": [{\"role\": \"user\", \"content\": \"Bonjour, donne-moi un symptôme courant du paludisme en une phrase.\"}]}'


on obtient:

"Un symptôme courant du paludisme est la fièvre récurrente, qui peut être accompagnée de frissons, de sueurs et de maux de tête."

