
{% assign status_icon = include.project.status | replace "active" "🛠" | replace "done" "✔" | replace "abandoned" "⚰" %}

### {{ status_icon }} {{ include.project.name }}

{{ include.project.description }}

