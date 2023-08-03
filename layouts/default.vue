<template>
  <div>
    <slot />
    <hr/>
    
    <LanguageSwitcher />
    <hr/>
    
    <section class='comments' aria-labelledby="comment">
      <h2 id="comment">Comments TT</h2>
      <ClientOnly>
        <Disqus />
      </ClientOnly>
    </section>
  </div>
</template>
