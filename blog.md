---
title: Blog
layout: default
description: The home page of InDieTasten's blog.
---

<!-- This loops through the paginated posts -->
<table>
  {% for post in paginator.posts %}
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

<!-- Pagination links -->
{% if paginator.total_pages > 1 %}
<div class="pagination">
  {% if paginator.previous_page %}
    <a href="{{ paginator.previous_page_path }}" class="previous">
      Previous
    </a>
  {% else %}
    <span class="previous">Previous</span>
  {% endif %}
  <span class="page_number ">
    Page: {{ paginator.page }} of {{ paginator.total_pages }}
  </span>
  {% if paginator.next_page %}
    <a href="{{ paginator.next_page_path }}" class="next">Next</a>
  {% else %}
    <span class="next ">Next</span>
  {% endif %}
</div>
{% endif %}
