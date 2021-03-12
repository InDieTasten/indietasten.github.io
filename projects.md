---
title: My projects
description: A list of my past and current development projects
---

# My projects

**Legend**

🛠 Actively abandoned

✔ Donely abandoned

⚰ Abandoned abandoned

## 2020

{% for project in site.data.projects %}

{% include project.md project=project %}

{% endfor %}
