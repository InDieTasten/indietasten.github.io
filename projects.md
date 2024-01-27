---
title: My projects
description: A list of my past and current development projects
layout: default
---

# My projects

**Legend**

🛠 Actively abandoned

✔ Donely abandoned

⚰ Abandoned abandoned


{% for project in site.data.projects %}

{% include project.md project=project %}

{% endfor %}
