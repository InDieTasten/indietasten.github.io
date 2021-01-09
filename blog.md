---
title: Blog
layout: default
description: The home page of InDieTasten's blog.
---

<!-- This loops through the paginated posts -->
<table>
  {% for post in site.posts %}
    <tr>
      <td>
        <span class="date">{{ post.date | date: "%B %e, %Y" }}</span>
      </td>
      <td>
        <a href="{{ post.url }}">
          {{ post.title }}
        </a>
      </td>
  </tr>
  {% endfor %}
</table>

