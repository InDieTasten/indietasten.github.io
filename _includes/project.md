## {{ site.status_icon_map[include.project.status] }} {{ include.project.name }}

{{ include.project.description }}

{% if include.project.github_link %}
 [GitHub]({{ include.project.github_link }})
{% endif %}
{% if include.project.youtube_link %}
 [YouTube]({{ include.project.youtube_link }})
{% endif %}
{% if include.project.demo_link %}
 [Demo]({{ include.project.demo_link }})
{% endif %}

{{ include.project.tags | join: " \| " }}
