---
title: Ideas
description: A list of my project ideas
layout: default
---

# My crazy project ideas I have't gotten to (yet)

{% for idea in site.data.ideas %}

## {{ idea.name }}

{{ idea.description }}

Technologies: 

Difficulty: {{ idea.difficulty }}

Scope: {{ idea.scope }}

{% endfor %}
