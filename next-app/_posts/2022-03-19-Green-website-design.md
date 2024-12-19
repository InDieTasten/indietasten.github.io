---
title: "Green website design"
excerpt: "How to reduce the carbon footprint of our modern websites"
date: "2022-03-19T00:00:00.000Z"
author:
  name: InDieTasten
  picture: "/assets/blog/authors/idt.jpeg"
tags: ["environment", "climate", "ethics", "hosting"]
---

In recent years, I've checked the carbon footprint of my personal homepage using a neat little tool available at [https://websitecarbon.com](https://websitecarbon.com).

The tool evaluates the carbon footprint of a website based on how much data it returns, and based on the type of power that is used to host the server, from what it can guess based on the IP address.

If you have a website, why don't you give it a spin and see how you compare? :)

If you score badly, I have a couple of suggestions for you:

## Framework bloat

Depending on what type of website you have, you might be subject to framework code bloating your response with no real benefit. I've seen blogs and personal websites with little interactivity, but shipping with full blown frontend-libraries like jQuery, Angular and React. If you are building a website that is designed only to display static information, you should look into static site generation.

If you have sites with lots of changing state and interactivity, you are of course kind of stuck with your framework. But there is still hope. Many frameworks and bundlers might have the ability to produce smaller output than what you are generating right now based on configuration.

✨ As an additional benefit, reducing framework bloat will make your page load faster. Not only on first load, but also on consecutive loads, as less scripts need to be parsed by the browser. That will make your page visitors happy, as well as increasing your SEO ratings!

## Images

Images need to be optimized. While basically everyone knows this, oftentimes it's just too much of a hassle to setup a proper image optimization pipeline or doing it manually. Use the appropriate file types for the use case. Use JPEGs for photographs and photorealistic renders, SVGs for illustrations and logos if available, and PNGs for illustrations and logos for which you don't have vectors.

Also reduce the dimensions of your images as much as possible. You don't want to make things blurry, but using a 4kx4k pixel image to display a tiny icon on your page is wasted data volume.

Last but not least, remove images that don't add anything to your website. No image is better than any optimized image!

✨ As an additional benefit, your images will load more quickly, will allow for smoother scrolling which improves the visitors experience and again your SEO ratings.

## HTML5

This kind of adds to the framework-bloat argument above, but you can also probably get away with using less frameworks and custom components. HTML5 is very powerful, and you don't need a lot of CSS to make it pretty.

Instead of using large CSS libraries like bootstrap, which really only create css-class-synonyms for native css properties, just use the appropriate HTML5 tag together with some handcrafted CSS you will save lots of data volume for removing a large library, as well as simplifying your markup. Don't forget about the cascading nature of CSS! You don't have to repeat yourself even with plain CSS3.

✨ Using the native controls provided by your browser and not messing too much with the default layouting of elements, you will get accessibility and responsiveness mostly for free. The more you try to do something "special" with your markup and styling, the more you break the aspects of HTML5 you get for free. Stick to the semantic meaning of the HTML5 elements!

## Fonts

While there are some use-cases for web fonts, like icons, you don't need to force browsers to download 4 differently weighted versions of 3 types of fonts you might occasionally reference in your stylesheets.

You can use the system fonts. Your users will be very familiar with them. The font isn't the place to express your uniqueness to the world!

## JavaScript

If you can avoid it, do that. As an example, this entire homepage and blog runs without JavaScript. No JavaScript, no IFrames, no shenanigans. Plain and simple.

✨ Without JavaScript, your website is very robust. It can't really fail to do anything, because it doesn't do anything.

## Tracking and ads

I don't think I need to say anything here.

✨ Bonus: No ads and no tracking means less/no cookies, easier/no banners and easier/no privacy policy of.

✨ Bonus 2: If you are in Germany, don't do commerce and don't collect user data, you won't need to provide an imprint for your personal homepage :)