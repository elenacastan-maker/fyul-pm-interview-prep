# Guía Completa de Preparación de Entrevista: Supply Product Manager @ FYUL

## 1. Contexto del Rol y Filosofía de la Empresa

* **Empresa:** FYUL (compañía matriz tras la integración de Printify, Printful y Snow Commerce)[cite: 1].
* **Entrevistador:** Marcel Kilgenstein (Director de Producto).
* **Equipo:** Supply Tech – Supplier Management[cite: 1].
* **Misión Principal:** Diseñar y escalar la tecnología para que los Decoradores (*Decorators*) puedan realizar su *self-onboarding* y pasar de 0 a estar publicados en la plataforma en menos de 24 horas sin intervención interna de equipos de FYUL[cite: 1].
* **Cultura y Estilo:** Tono directo, analítico, enfocado en datos (sin frases vagas como "mejora significativa"), trabajo codo con codo con Ingeniería y especificaciones completas antes de ejecución (*solution-complete PRDs*)[cite: 1].

---

## 2. Puntos Clave de Comunicación (Tu Discurso)

| ❌ Lenguaje a evitar (Vago / Pasivo) | ✅ Estilo FYUL (Directo y con Datos) |
| :--- | :--- |
| *"Mejoramos significativamente el proceso de onboarding."*[cite: 1] | *"Redujimos el Time-to-Live un 40%, bajando el tiempo medio de activación de 5 días a 18 horas."*[cite: 1] |
| *"Trabajo muy bien con los ingenieros."* | *"Escribo PRDs 'solution-complete' e involucro al Tech Lead en la fase de descubrimiento para asegurar viabilidad antes de la ejecución."*[cite: 1] |
| *"La IA ayudó mucho a operaciones."* | *"La automatización redujo en un 70% las intervenciones manuales del equipo de operaciones por cada catálogo procesado."*[cite: 1] |

---

## 3. Tecnología de IA Aplicada al Decorador

Un **Decorador (*Decorator*)** en esta industria es el proveedor de manufactura/imprenta que plasma el diseño digital sobre el producto físico[cite: 1]. La tecnología de IA involucrada abarca:

1. **Ingesta y Calidad de Datos (Pre-prensa):**
   * **Super-Resolución (GANs):** Escalado de imágenes de baja resolución subidas por el usuario a 300 DPI sin pérdida de calidad.
   * **Separación de color y vectorización:** Conversión automática de PNG/JPG a capas vectoriales o CMYK para impresoras industriales.
   * **LLMs para Taxonomía:** Extracción y mapeo automático de atributos heterogéneos de proveedores a la taxonomía interna de FYUL[cite: 1].
2. **Visualización y Ubicación:**
   * **Placement Automático:** IA que calcula arrugas, sombras y geometría del producto para generar renders 3D (*mockups*) hiperrealistas y ubicar el arte sin tocar costuras.
3. **Planta de Producción y Control de Calidad:**
   * **Visión Artificial (CNNs):** Cámaras en la línea de impresión que comparan la prenda física impresa con el archivo digital píxel a píxel para detectar taras automáticamente.

---

## 4. 20 Preguntas de Marcel (Director de Producto) y Guía de Respuesta

### Bloque 1: Visión de Producto y Mentalidad de Plataforma (*Platform Mindset*)

1. **"At FYUL, our goal is to enable Decorators to go from zero to live in under 24 hours without internal intervention. How do you approach designing self-onboarding experiences for complex B2B supply platforms?"**[cite: 1]
   * **Respuesta:** Divido el proceso en tres pilares: **estandarización de entrada** (plantillas y validación API en tiempo real), **validación automatizada en background** (peticiones en lote sin revisión humana) y **manejo de errores guiado** (instrucciones claras en el portal para que el Decorador corrija su catálogo sin abrir tickets)[cite: 1].

2. **"How do you balance making the platform simple for non-technical suppliers while maintaining strict data structures for our catalog system?"**
   * **Respuesta:** Oculto la complejidad en la UI (métodos como drag-and-drop guiado para no técnicos y APIs para avanzados), pero mantengo la misma capa de datos rígida donde los esquemas de atributos son innegociables.

3. **"In a marketplace ecosystem, how do you decide where FYUL sets rigid rules versus where we leave flexibility for suppliers to define their own offers?"**[cite: 1]
   * **Respuesta:** FYUL fija las reglas en lo que afecta a la interoperabilidad y a la experiencia del comprador (categorías, formato de pedidos, SLAs)[cite: 1]. El proveedor decide sus variables comerciales (precios, catálogo ofrecido y capacidad)[cite: 1].

4. **"What’s your process for mapping out a supplier's end-to-end journey from initial sign-up to their first published product?"**
   * **Respuesta:** Mapeo el embudo paso a paso (Registro $\rightarrow$ Integración $\rightarrow$ Mapeo $\rightarrow$ Validación $\rightarrow$ Publicación) e identifico la tasa de conversión, tiempo invertido y caída de usuarios (*drop-off*) en cada etapa.

5. **"How do you approach localization, multi-currency, or regional compliance requirements when scaling supplier onboarding globally?"**
   * **Respuesta:** Diseñando la arquitectura para internacionalización desde el día uno: separando la lógica de negocio de las variables locales (reglas fiscales, monedas) e implementando catálogos con esquemas dinámicos por región.

### Bloque 2: Rigor en Ejecución y Especificación (PRDs)

6. **"Our JD emphasizes 'solution-complete PRDs' with no 'discovery disguised as delivery'. How do you ensure your PRDs are fully detailed before handover?"**[cite: 1]
   * **Respuesta:** Hago la fase de Discovery antes de redactar la especificación técnica[cite: 1]. Un PRD completo contiene problema cuantificado, historias de usuario, diagramas de flujo de datos, matriz de casos límite (*edge cases*) y criterios de aceptación, revisado previamente con el Engineering Manager[cite: 1].

7. **"How do you manage edge cases during feature definition without scope creeping the initial release?"**
   * **Respuesta:** Los mapeo en una matriz de frecuencia e impacto. Si un caso límite afecta a menos del 5% de las transacciones y toma el 50% del tiempo de desarrollo, se resuelve temporalmente con un flujo operativo alternativo mientras se lanza la v1.

8. **"Describe how you work day-to-day with your Engineering Manager and engineers. How do you ensure engineering owns the roadmap alongside you?"**[cite: 1]
   * **Respuesta:** Definimos juntos el 'qué' y el 'por qué', dejándoles el 'cómo'[cite: 1]. Reservo capacidad técnica continua (ej. 20%) para refactorización e involucro a ingeniería desde la conceptualización de métricas de negocio[cite: 1].

9. **"How do you handle technical debt when engineering wants to refactor infrastructure that directly impacts your product timelines?"**
   * **Respuesta:** Evaluándolo por su ROI. Le pido a ingeniería traducir la refactorización a métricas de negocio (ej. *"reducir latencia de sincronización de 10 min a 30 seg"*). Si sostiene la escalabilidad, se prioriza.

10. **"How do you define acceptance criteria for complex background processes like bulk catalog data pipelines?"**[cite: 1]
    * **Respuesta:** Especificando rendimiento (*throughput* por segundo), tasa de error tolerable (<1%), política de reintentos exponenciales ante fallos y logs de errores parciales.

### Bloque 3: Automatización, Herramientas Internas e IA

11. **"Supplier onboarding involves complex catalog validation. How have you used automation or AI/LLMs to replace manual operations tasks in the past?"**[cite: 1]
    * **Respuesta:** He utilizado modelos LLM con salidas estructuradas (JSON) para mapear automáticamente atributos heterogéneos de proveedores a la taxonomía interna, reduciendo semanas de trabajo manual de operaciones a minutos[cite: 1].

12. **"How do you prioritize building internal operational tooling versus public-facing supplier features?"**[cite: 1]
    * **Respuesta:** Por apalancamiento (*leverage*). Si una herramienta interna duplica la capacidad de un agente para desbloquear 100 proveedores, tiene mayor impacto directo en la oferta que una mejora cosmética en el portal[cite: 1].

13. **"When an automated onboarding process fails due to bad supplier data, how do you handle exception management and error reporting?"**[cite: 1]
    * **Respuesta:** Proceso los datos válidos e aislo los erróneos. Muestro en el portal del proveedor un reporte con la fila exacta, el dato incorrecto y cómo solucionarlo, evitando llamadas a soporte.

14. **"How do you measure the operational cost savings of a self-service onboarding initiative?"**[cite: 1]
    * **Respuesta:** $\text{Ahorro} = (\text{Horas-hombre reducidas} \times \text{Coste hora}) + \text{Ingresos adelantados por menor Time-to-Live}$[cite: 1].

### Bloque 4: Métricas, Datos y Comunicación Directa

15. **"We value direct, data-backed communication without vague claims. Walk me through a metric you owned, your baseline, your target, and the precise outcome."**[cite: 1]
    * **Respuesta:** **Métrica:** Tiempo de activación de proveedores. **Baseline:** 6.5 días. **Objetivo:** < 48 horas. **Acción:** Automatización del esquema de datos y rediseño del mapeo. **Resultado:** Reducción a 31 horas (-80%) e incremento del 34% en proveedores activos al mes.

16. **"If catalog growth is rising but supplier activation rates are dropping, how would you diagnose and address the issue?"**[cite: 1]
    * **Respuesta:** Segmentando datos. Muestra que pocos proveedores grandes están subiendo muchos productos, pero los pequeños están abandonando[cite: 1]. Analizaría los puntos de fuga (*drop-off*) en el embudo de registro para corregir el bloqueo.

17. **"How do you define 'time-to-live' for a supplier catalog, and what levers would you pull to reduce it?"**[cite: 1]
    * **Respuesta:** Es el tiempo transcurrido desde la creación de la cuenta del Decorador hasta que su primer producto está publicado para venta[cite: 1]. Palancas: validación en tiempo real, mapeo asistido y eliminación de aprobaciones manuales de operaciones[cite: 1].

18. **"How do you set KPIs for initiatives where data quality is the main objective?"**[cite: 1]
    * **Respuesta:** Métricas: % de productos con campos obligatorios completos, tasa de rechazo por errores sintácticos y % de pedidos cancelados por datos desactualizados.

### Bloque 5: Colaboración y Manejo de Conflictos

19. **"How do you align competing priorities between internal Operations (who want manual overrides) and Product (who want scalable automation)?"**[cite: 1]
    * **Respuesta:** Permitir anulaciones manuales temporalmente para no bloquear el negocio, pero registrándolas como deuda técnica. Las intervenciones más frecuentes se convierten automáticamente en la siguiente regla de automatización.

20. **"Tell me about a time an initiative failed to deliver its expected outcome. How did you communicate this to leadership and pivot?"**
    * **Respuesta:** Presentando datos: *Hipótesis vs. Resultado Real*. Explico por qué falló la asunción (ej. falta de validación con clientes enterprise) y presento inmediatamente la propuesta de ajuste con su nuevo roadmap.

---

## 5. 20 Preguntas para Hacerle Tú a Marcel

### Bloque 1: Estrategia de Plataforma y Convergencia
1. *"Given the unification of Printify, Printful, and Snow Commerce under FYUL, are we integrating legacy supplier systems or building a single unified self-service portal from scratch?"*[cite: 1]
2. *"How does the Supply Tech pillar coordinate roadmap priorities across different business units within FYUL?"*[cite: 1]
3. *"What is FYUL’s long-term vision for the Decorator ecosystem over the next 2–3 years?"*
4. *"How do you handle feature differentiation for high-volume enterprise suppliers versus smaller local decorators?"*

### Bloque 2: Operaciones y Cuellos de Botella Técnicos
5. *"What is currently the single biggest bottleneck preventing Decorators from going live in under 24 hours?"*[cite: 1]
6. *"How structured is the catalog data coming from new Decorators today? Is formatting standard or highly fragmented?"*
7. *"What role does internal Operations play today in catalog validation, and how fast are we looking to automate those manual checks?"*[cite: 1]
8. *"How automated are the inventory and price update syncing mechanisms once a supplier is live?"*

### Bloque 3: Automatización, IA y Stack Tecnológico
9. *"Are there already active AI or machine learning initiatives being used for catalog attribute mapping or data validation?"*[cite: 1]
10. *"How do the engineering teams approach API-first integrations vs. portal-based UI tools for supplier onboarding?"*
11. *"How much technical debt in the legacy pipeline currently impacts the speed of new feature delivery?"*

### Bloque 4: Cultura de Producto y Estructura del Equipo
12. *"How is the Supply Product team currently structured in terms of PMs, Tech Leads, Engineering Managers, and Designers?"*
13. *"How do product teams at FYUL conduct discovery with external suppliers without slowing down delivery execution?"*[cite: 1]
14. *"How do you foster tight alignment between Product Managers and Engineering Managers in day-to-day operations?"*[cite: 1]
15. *"What does the typical release cycle look like for the Supply Tech team?"*

### Bloque 5: Métricas de Éxito e Impacto
16. *"How will you measure success for this role in the first 6 months—is it accelerating time-to-live, increasing activation rates, or total catalog volume?"*[cite: 1]
17. *"What is the most critical metric on your dashboard right now for the Supply pillar?"*
18. *"What is the biggest challenge the person entering this role will face in their first 90 days?"*
19. *"How does this role interact with the Merchant-facing product teams to ensure supply demand matches merchant needs?"*
20. *"What are the next steps in the process after this interview?"*